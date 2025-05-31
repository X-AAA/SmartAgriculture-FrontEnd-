import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Farm, Field } from '../farm-page/farm.model';
import { DashboardService } from '../../services/dashboard.service';
import { HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


declare var bootstrap: any;

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit, AfterViewInit {

openViewModal(id: number) {
this.router.navigate(['/farm-page', id]);

}
logout() {
  this.authService.logout();
}


  addFarmForm!: FormGroup;
  editFarmForm!: FormGroup;
  filterFarmForm!: FormGroup;
  isDarkMode: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean  = false;
  // Placeholder for farm data - replace with actual data source

 loadingError: boolean = false;
 filteredFarms: Farm[] = []; // Initially show all farms
  farmToDeleteId: number | null = null;
  farmToEditId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private readonly authService: DashboardService,private router: Router
  ) {}

  ngOnInit(): void {

    
    this.initializeForms();
    this.loadThemePreference();
    this.loadFarmData();

    
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
    // Initialize Bootstrap dropdowns if not handled automatically
    const dropdownElementList = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });


    const scroll = document.getElementById('scrollContainer');
    if (scroll) {
      scroll.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        // Adjust the scrolling speed by multiplying deltaY
        scroll.scrollLeft += event.deltaY * 0.5;
         // Reduced speed for smoother scrolling
      }, { passive: false });
    }

  }

  initializeForms(): void {
    this.addFarmForm = this.fb.group({
      farmName: ['', Validators.required],
      farmSize: [null, [Validators.required, Validators.min(1)]],
      farmLocation: ['', Validators.required]
    });

    this.editFarmForm = this.fb.group({
      farmId: [null], // Hidden field, populated when opening modal
      farmName: ['', Validators.required],
      farmSize: [null, [Validators.required, Validators.min(1)]],
      farmLocation: ['', Validators.required]
    });

    this.filterFarmForm = this.fb.group({
      minHealth: [0],
      minSize: [0]
    });

    // Update filtered farms when filter form changes
    this.filterFarmForm.valueChanges.subscribe(filters => {
        this.applyFilters(filters);
    });
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.setAttribute(document.body, 'data-bs-theme', 'dark');
    } else {
      this.isDarkMode = false;
      this.renderer.removeAttribute(document.body, 'data-bs-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'dark');
      this.renderer.setAttribute(document.body, 'data-bs-theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      this.renderer.removeAttribute(document.body, 'data-bs-theme');
    }
  }

  initializeCharts(): void {
    // Chart data (Example - replace with dynamic data)
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Crop Yield (tons)',
        data: [12, 19, 15, 17, 22, 25, 32, 38, 35, 30, 25, 20],
        borderColor: '#759a3b',
        backgroundColor: 'rgba(117, 154, 59, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };

    const cropData = {
      labels: ['Corn', 'Wheat', 'Soybeans', 'Vegetables', 'Fruits'],
      datasets: [{
        label: 'Acres',
        data: [150, 80, 100, 70, 50],
        backgroundColor: [
          '#759a3b', // var(--farm-chart-colors-1)
          '#8BC34A', // var(--farm-chart-colors-2)
          '#CDDC39', // var(--farm-chart-colors-3)
          '#FFC107', // var(--farm-chart-colors-4)
          '#FF9800'  // var(--farm-chart-colors-5)
        ],
        borderWidth: 0
      }]
    };

    // Initialize Productivity Chart
    const productivityCtx = (this.elementRef.nativeElement.querySelector('#productivityChart') as HTMLCanvasElement)?.getContext('2d');
    if (productivityCtx) {
      new Chart(productivityCtx, {
        type: 'line',
        data: monthlyData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                // drawBorder: false // Might need adjustment based on Chart.js version
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    // Initialize Crop Distribution Chart
    const cropDistributionCtx = (this.elementRef.nativeElement.querySelector('#cropDistributionChart') as HTMLCanvasElement)?.getContext('2d');
    if (cropDistributionCtx) {
      new Chart(cropDistributionCtx, {
        type: 'doughnut',
        data: cropData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                 padding: 15
              }
            }
          }
        }
      });
    }
  }
  farms:Farm[]=[]; 
  loadFarmData(): void {
    const token = this.authService.getToken();  // Retrieve the token from the service
    this.loadingError = false;
    
    if (token) {
      const headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', `Bearer ${token}`);

      this.authService.FarmInfo(headers).subscribe({
          next: (response) => {
            this.farms = response.map((farmData: any) => { // Assuming response is any[] for simplicity
              const farmInstance = new Farm(
                farmData.farmName,
                farmData.farmSize,
                farmData.framLocation // Use the property name from the API response
              );
              (farmInstance as any).id = farmData.id;
              (farmInstance as any).overAllStatus = farmData.overAllStatus;
              (farmInstance as any).weatherReadings = farmData.weatherReadings;
              (farmInstance as any).fields = farmData.fields;
              return farmInstance;
            });
            this.applyFilters(this.filterFarmForm.value);
            console.log(this.farms);
        }, 
        error: (error) => {
          console.error('Error:', error);  
        }
      });
     
    } else {
      console.log('No token found. Please log in.');
    }
  }

  onAddFarmSubmit(): void {

    

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', `Bearer ${token}`);

      
    if (this.addFarmForm.valid) {
      console.log('Add Farm Form Submitted:', this.addFarmForm.value);
      // Add logic to actually add the farm (e.g., API call)  
        
      const newFarm :Farm = new Farm(
        this.addFarmForm.value.farmName,
        this.addFarmForm.value.farmSize,
        this.addFarmForm.value.farmLocation,
        
       );
    
       this.authService.AddFarm(newFarm,headers).subscribe({
        next: (response) => {
          console.log('Farm added successfully:', response);
          this.farms.push(response);
          this.applyFilters(this.filterFarmForm.value); // Re-apply filters

          const modalElement = document.getElementById('deleteFarmModal');
          if (modalElement) {
              const addModal = bootstrap.Modal.getInstance(modalElement);
              if (addModal) {
                  addModal.show();
              
              } else {
                  console.warn('Could not get Bootstrap modal instance to hide it.');
              }
          } else {
              console.warn('Could not find modal element with ID deleteFarmModal to hide it.');
          }
        
    
        },
        error: (error) => {
          console.error('Error adding farm:', error);
          this.errorMessage = error?.error?.message ?? 'Farm adding failed. Please try again.';


          
      
        }
      });

    
      this.farms.push(newFarm);
      this.applyFilters(this.filterFarmForm.value); // Re-apply filters
      this.addFarmForm.reset();
    } 

   

    }else {
      console.log('No token found. Please log in.');
    }

  }

  

  openEditModal(farmId: number): void {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders()
          .set('Accept', '*/*')
          .set('Authorization', `Bearer ${token}`);
  
        // Use the new getFarmById service method
        this.authService.getFarmById(farmId, headers).subscribe({
          next: (farm) => {
            if (farm) {
              this.farmToEditId = farmId;
              // Patch form values with fetched data
              this.editFarmForm.patchValue({
                farmId: farmId, // Populate the disabled field for info
                farmName: farm.getFarmName(), // Or farm.farmName if it's a simple property
                farmSize: farm.getFarmSize(),   // Or farm.farmSize
                farmLocation: farm.getFarmLocation() // Or farm.farmLocation
              });

              this.errorMessage = null; // Clear previous errors
              // Add code here to programmatically open your modal if needed
              // e.g., using NgbModal or similar library
              // const modalRef = this.modalService.open(YourModalComponent);
              // modalRef.componentInstance.farmData = farm;
              console.log('Farm data loaded for editing.');
            }
          },
          error: (error) => {
            console.error('Error fetching farm details:', error);
            this.errorMessage = error?.error?.message ?? 'Failed to load farm details. Please try again.';
          }
        });
      } else {
        console.log('No token found. Please log in.');
        this.errorMessage = 'Authentication token not found. Please log in.';
      }
    }

    
  onEditFarmSubmit(): void {const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json') 
        .set('Authorization', `Bearer ${token}`);


 // Get updated values from the form (excluding disabled farmId)
 const updatedData:Partial<Farm>  = new  Farm (
   this.editFarmForm.value.farmName,
 this.editFarmForm.value.farmSize,
 this.editFarmForm.value.farmLocation
);

       // Use the updateFarm service method with PATCH
      this.authService.EditFarm(this.farmToEditId!, updatedData, headers).subscribe({
        next: (updatedFarm) => {
          console.log('Farm updated successfully:', updatedFarm);
          this.errorMessage = null;
          this.editFarmForm.reset();
          this.loadFarmData();
          this.applyFilters(this.filterFarmForm.value); // Re-apply filters
          const modalElement = document.getElementById('deleteFarmModal');
          if (modalElement) {
              const editModal = bootstrap.Modal.getInstance(modalElement);
              if (editModal) {
                  editModal.show();
              
              } else {
                  console.warn('Could not get Bootstrap modal instance to hide it.');
              }
          } else {
              console.warn('Could not find modal element with ID deleteFarmModal to hide it.');
          }
        },
        error: (error) => {
          console.error('Error updating farm:', error);
          this.errorMessage = error?.error?.message ?? 'Farm update failed. Please try again.';
        }
      });
    } else {
      console.log('No token found. Please log in.');
      this.errorMessage = 'Authentication token not found. Please log in.';
    }
  }


  onFilterFarmSubmit(): void {
    // Filters are applied on valueChanges, but you might want explicit submit logic too
    console.log('Filter Form Submitted:', this.filterFarmForm.value);
    this.applyFilters(this.filterFarmForm.value);
     // Close modal programmatically if needed (already handled by data-bs-dismiss in HTML button)
  }

  applyFilters(filters: { minHealth: number, minSize: number }): void {
    console.log('Applying filters:', filters);

    // Filter the already loaded farms based on the filters
    this.farms = this.farms.filter(farm =>
        // Check if the farm's health meets the minimum health filter
        (!filters.minHealth || farm.getOverAllStatus()! >= filters.minHealth) &&
        // Check if the farm's size meets the minimum size filter
        (!filters.minSize || farm.getFarmSize() >= filters.minSize)
    );

   
}
  resetFilters(): void {
    this.filterFarmForm.reset({ minHealth: 0, minSize: 0 });
    this.applyFilters({ minHealth: 0, minSize: 0 }); // Re-apply default filters
  }

  openDeleteModal(farmId: number): void {


    this.farmToDeleteId = farmId;
    this.errorMessage = null; // Clear previous errors
    this.farmToDeleteId = null; // Reset name

    // *** Optional: Fetch farm name for better confirmation message ***
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Accept', '*/*')
        .set('Authorization', `Bearer ${token}`);
      this.authService.getFarmById(farmId, headers).subscribe({
        next: (farm) => {
          if (farm) {
          this.farmToDeleteId = farmId; // Or farm.farmName
          // Now trigger the modal display (e.g., using data-bs-toggle or programmatically)
          console.log(`Prepared to delete farm: ${this.farmToDeleteId} (ID: ${farmId})`);
          // Example: If using Bootstrap's JS API:
          // const deleteModal = new bootstrap.Modal(document.getElementById('deleteFarmModal'));
          // deleteModal.show();
        }},
        error: (err) => {
          console.error('Error fetching farm name for delete confirmation:', err);
          // Still set the ID and open the modal, but without the name
          console.log(`Prepared to delete farm ID: ${farmId}`);
          // Trigger modal display here too
        }
      });
    } else {
      this.errorMessage = 'Authentication token not found. Please log in.';
      console.log('No token found. Cannot fetch farm name or delete.');
      // Optionally prevent modal opening if token is required even for name display
    }

    }

  deleteFarm(): void {
    if (this.farmToDeleteId === null) {
      this.errorMessage = 'No farm selected for deletion.';
      return;
    }

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Accept', '*/*') // Usually Accept is needed for the response
        .set('Authorization', `Bearer ${token}`);

      this.isLoading = true; // Indicate loading state
      this.errorMessage = null;

      // Call the DeleteFarm service method
      this.authService.DeleteFarm(this.farmToDeleteId!, headers).subscribe({
        next: () => {
          console.log(`Farm with ID ${this.farmToDeleteId} deleted successfully.`);
          this.isLoading = false;
          this.farmToDeleteId = null; // Reset ID
          this.farmToDeleteId = null; // Reset name
          // Add code here to close the modal
          const modalElement = document.getElementById('deleteFarmModal');
          if (modalElement) {
              const deleteModal = bootstrap.Modal.getInstance(modalElement);
              if (deleteModal) {
                  deleteModal.show();
              
              } else {
                  console.warn('Could not get Bootstrap modal instance to hide it.');
              }
          } else {
              console.warn('Could not find modal element with ID deleteFarmModal to hide it.');
          }
          // Add code to refresh the list of farms
           this.loadFarmData();
        },
        error: (error) => {
          console.error('Error deleting farm:', error);
          this.isLoading = false;
          this.errorMessage = error?.error?.message ?? 'Farm deletion failed. Please try again.';
          // Keep the modal open or handle error display appropriately
        }
      });
    } else {
      console.log('No token found. Please log in.');
      this.errorMessage = 'Authentication token not found. Please log in.';
    }
  }
  


  getTotalAcres(): number {
    return this.farms.reduce((sum, farm) => sum + farm.getFarmSize(), 0);
  }


  getAverageHealth(): number {
    const validFarms = this.farms.filter(farm => farm.getOverAllStatus() !== undefined);
    if (validFarms.length === 0) return 0;
    return validFarms.reduce((sum, farm) => sum + (farm.getOverAllStatus() || 0), 0) / validFarms.length;
  }
  
}

