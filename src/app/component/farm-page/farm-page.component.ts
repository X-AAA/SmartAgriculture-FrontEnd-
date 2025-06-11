declare var bootstrap: any;
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Farm, Field, Recommendation, SoilData } from './farm.model';
import { AuthService } from '../../services/auth.service';
import { FieldService } from '../../services/field.service';
import { HttpHeaders } from '@angular/common/http';
import { WeatherReadings } from './farm.model';
import { FarmService } from '../../services/farm.service';
import { SoilDataService } from '../../services/soilData.service';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-farm-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './farm-page.component.html',
  styleUrl: './farm-page.component.css'
})

export class FarmPageComponent implements OnInit, AfterViewInit {

  addFieldForm!: FormGroup;
  addSoilDataForm!: FormGroup;

  display: boolean = false;
  selected: boolean = false;
  isLoading: boolean = false;
  isDarkMode: boolean = false;

  soilDataItems:any[]=[];
  recommendations: any[] = [];
  fields : Field[] = [];

  selectedField: Field | null = null;
  weatherReadings!: WeatherReadings;
 
  
  errorMessage: string | null = null;
  successMessage: string | null = null;
  farmLocation: string | null = null;
  farmSize: number | null = null;
  farmName: string | null = null;

  farmId: number | null = null ;
  fieldToDeleteId: number | null = null;
 


  constructor(
    private readonly authService: AuthService,
    private readonly fieldService: FieldService,
    private readonly recommendationService: RecommendationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly farmService: FarmService,
    private soilDataService: SoilDataService
  ) {}

onAddSoilDataSubmit() {
  const token = this.authService.getToken();
  if (token) {
    const headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', `Bearer ${token}`);

    
  if (this.addSoilDataForm.valid) {
    // Add logic to actually add the farm (e.g., API call)  
      
    const newSoilData :SoilData = new SoilData(
     this.addSoilDataForm.value.soilPH,
     this.addSoilDataForm.value.nitrogen,
     this.addSoilDataForm.value.phosphorus,
     this.addSoilDataForm.value.potassium,
     this.addSoilDataForm.value.soilTexture,
     this.addSoilDataForm.value.soilMoisture,
     this.addSoilDataForm.value.soilOrganicMatter
     );
     this.soilDataService.addSoildData(this.farmId!,this.selectedField!.getId(),newSoilData,headers).subscribe({
      next: () => {  

        this.getSoilDataItems();

this.successMessage = 'Soil data added successfully.';
console.log(this.successMessage);

      },
      error: (error) => {
        console.error('Error adding soil data:', error);
        this.errorMessage = error?.error?.message ?? 'Soil data adding failed. Please try again.';
    
      }
    });



  
    this.addSoilDataForm.reset();

}
  }
}

getSoilDataItems() {
  const token = this.authService.getToken();
  if (token) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);

    // Use the new getFarmById service method
    this.soilDataService.getSoilData(this.farmId!,this.selectedField!.getId(), headers).subscribe({
      next: (soilData: any ) => {
    this.display = false;
          const soilDataInstance = new SoilData(
            soilData.soilPH,
            soilData.nitrogen,
            soilData.phosphorus,
            soilData.potassium,
            soilData.soilTexture,
            soilData.soilMoisture,
            soilData.soilOrganicMatter // Use the property name from the API response
          );
       
          (soilDataInstance as any ).id = soilData.id;
          
          this.soilDataItems = [{
            title:"soilPH",
            tooltip:"soilPH",
            value:soilDataInstance.soilPH,
           },
            {
              title:"nitrogen",
              tooltip:"nitrogen",
              value:soilDataInstance.nitrogen,
            },  
          {
            title:"phosphorus",
            tooltip:"phosphorus",
            value:soilDataInstance.phosphorus,
          },
          {
            title:"potassium",
            tooltip:"potassium",
            value:soilDataInstance.potassium,
          },
          {
            title:"soilTexture",
            tooltip:"soilTexture",
            value:soilDataInstance.soilTexture,
          },
          {
            title:"soilMoisture",
            tooltip:"soilMoisture",
            value:soilDataInstance.soilMoisture,
          },
          {
            title:"soilOrganicMatter",
            tooltip:"soilOrganicMatter",
            value:soilDataInstance.soilOrganicMatter,
            }]; 

        console.log(this.soilDataItems);

       
      },
      error: (error) => {
        this.display = true;
        console.error('Error fetching soil data:', error);
        this.errorMessage = error?.error?.message ?? 'Failed to load soil data. Please try again.';
      }
    });
  } else {
    this.selected = false;
    console.log('No token found. Please log in.');
    this.errorMessage = 'Authentication token not found. Please log in.';
  }


}

selectField(fieldId: number) {
  const token = this.authService.getToken();
  if (token) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);

    // Use the new getFarmById service method
    this.fieldService.getFieldById(this.farmId!,fieldId, headers).subscribe({
      next: (field: any ) => {
          const fieldInstance = new Field(
            field.fieldName,
            field.fieldSize,
            field.cropType // Use the property name from the API response
          );
       
          (fieldInstance as any ).id = field.id;
          (fieldInstance as any ).soilData = field.soilData;
          (fieldInstance as any ).recommendation = field.recommendation;
          (fieldInstance as any ).fieldCondition = field.fieldCondition;
            
          this.selectedField = fieldInstance; // Assuming response is any[] for simplicity
          this.getSoilDataItems();
          this.getRecommendation();
        
          
        

      },
      error: (error) => {
        console.error('Error fetching field details:', error);
        this.errorMessage = error?.error?.message ?? 'Failed to load field details. Please try again.';
      }
    });
    
  } else {
    this.selected = false;
    console.log('No token found. Please log in.');
    this.errorMessage = 'Authentication token not found. Please log in.';
  }
}

getSelectedField(): Field | null {
  return this.selectedField;
}

onAddFieldSubmit() {

  const token = this.authService.getToken();
  if (token) {
    const headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', `Bearer ${token}`);

    
  if (this.addFieldForm.valid) {
    // Add logic to actually add the farm (e.g., API call)  
      
    const newField :Field = new Field(
      this.addFieldForm.value.fieldName,
      this.addFieldForm.value.fieldSize,
      this.addFieldForm.value.cropType,
     );
   this.farmId = this.route.snapshot.params['id'];
     this.fieldService.addField(this.farmId!,newField,headers).subscribe({
      next: () => {  



      },
      error: (error) => {
        console.error('Error adding field:', error);
        this.errorMessage = error?.error?.message ?? 'Field adding failed. Please try again.';
    
      }
    });



  
    this.fields.push(newField);
    this.addFieldForm.reset();
  } 

 

  }else {
    console.log('No token found. Please log in.');
  }


}

openDeleteModal(fieldId: number): void {


  this.errorMessage = null; 
  
    const token = this.authService.getToken();
    if (token) {
        this.fieldToDeleteId = fieldId;
    } else {
      this.errorMessage = 'Authentication token not found. Please log in.';
      console.log('No token found. Cannot fetch farm name or delete.');
    }

}

deleteField(): void {
    if (this.fieldToDeleteId === null) {
      this.errorMessage = 'No field selected for deletion.';
      return;
    }

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Accept', '*/*') 
        .set('Authorization', `Bearer ${token}`);

      this.isLoading = true; 
      this.errorMessage = null;

      // Call the DeleteFarm service method
      this.fieldService.DeleteField(this.fieldToDeleteId,this.farmId!, headers).subscribe({
        next: () => {
          console.log(`Farm with ID ${this.fieldToDeleteId} deleted successfully.`);
          this.isLoading = false;
          this.fieldToDeleteId = null; // Reset ID
          this.fieldToDeleteId = null; // Reset name
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
           this.loadFieldData();
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
  
applyRecommendation(rec: Recommendation) {
  this.recommendations.splice(this.recommendations.indexOf(rec), 1);   

}

getRecommendation(): any {

  const token = this.authService.getToken();
  if (token) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);

    // Use the new getFarmById service method
    this.recommendationService.getRecommendations(this.farmId!,this.selectedField!.getId(), headers).subscribe({
      next: (recommendation: any[] ) => {
        this.display = false;
        this.recommendations = recommendation.map((rec: any) => ({
          value: rec.value,
          advice: rec.advice,
          parameter: rec.parameter,
          applied: rec.applied
        }));
        this.selectedField!.setRecommendation(this.recommendations);
       

      },
      error: (error) => {
        this.display = true;
        console.error('Error fetching recommendations:', error);
        this.errorMessage = error?.error?.message ?? 'Failed to load recommendations. Please try again.';
      }
    });
    
  } else {
    this.selected = false;
    console.log('No token found. Please log in.');
    this.errorMessage = 'Authentication token not found. Please log in.';
  }

 
}

logout() {
throw new Error('Method not implemented.');
}
  
ngOnInit(): void {
    this.initializeForms();
    this.loadThemePreference();
  this.loadFieldData();
}

ngAfterViewInit(): void {
    // Initialize Bootstrap dropdowns
    const dropdownElementList = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

initializeForms(): void {
    this.addFieldForm = this.fb.group({
      fieldName: ['', Validators.required],
      fieldSize: [null, [Validators.required, Validators.min(1)]],
      cropType: ['Corn', Validators.required]
    });

    this.addSoilDataForm = this.fb.group({
      soilPH: [null, [Validators.required, Validators.min(0), Validators.max(14)]],
      nitrogen: [null, [Validators.required, Validators.min(0)]],
      phosphorus: [null, [Validators.required, Validators.min(0)]],
      potassium: [null, [Validators.required, Validators.min(0)]],
      soilTexture: ['Loam', Validators.required],
      soilMoisture: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      soilOrganicMatter: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
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

loadFieldData(): void {
 
  const token = this.authService.getToken();  // Retrieve the token from the service
    this.isLoading = false;
    if (token) {
      const headers = new HttpHeaders().set('Accept', '*/*').set('Authorization', `Bearer ${token}`);
   this. farmId = this.route.snapshot.params['id'];
   this. farmLocation = this.route.snapshot.params['location'];
   this. farmSize = this.route.snapshot.params['size'];
   this. farmName = this.route.snapshot.params['name'];

  this.farmService.getFarmWeatherById(this.farmId!,this.farmLocation!, headers).subscribe({
    next: (response:any) => {
      this.weatherReadings = response;
      console.log(this.weatherReadings);
    },
    error: (error) => {
      console.error('Error fetching weather readings:', error);
    }
  });

  


      this.fieldService.FieldInfo(this.farmId!,headers).subscribe({
          next: (response) => {
            this.fields = response.map((fieldData: any) => { // Assuming response is any[] for simplicity
              const fieldInstance = new Field(
                fieldData.fieldName,
                fieldData.fieldSize,
                fieldData.cropType // Use the property name from the API response
              );
            
              (fieldInstance as any).id = fieldData.id;
              (fieldInstance as any).soilData = fieldData.soilData;
              (fieldInstance as any).recommendation = fieldData.recommendation;
              (fieldInstance as any).fieldCondition = fieldData.fieldCondition;
              (fieldInstance as any).active = fieldData.active;


              return fieldInstance;
            });
             console.log(this.fields);

        }, 
        error: (error  ) => {
          console.error('Error:', error);  
        }
      });
     
    } else {
      console.log('No token found. Please log in.');
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

navigateToDashboard(): void {
    this.router.navigate(['/dashboard-page']);
}

}