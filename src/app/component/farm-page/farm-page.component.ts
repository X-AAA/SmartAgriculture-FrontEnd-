import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmService, FarmUser } from '../../services/farm.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-farm-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm-page.component.html',
  styleUrl: './farm-page.component.css'
})
export class FarmPageComponent implements OnInit {
  farmUser: FarmUser | null = null;
  error: string | null = null;
  loading = true;

  constructor(
    private readonly farmService: FarmService,
    private readonly route: ActivatedRoute
  ) {}

  
  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const accessToken = params['token'];
        const tokenType = params['tokenType'];
        return this.farmService.getUserFarmInfo(accessToken);
      })
    ).subscribe({
      next: (user) => {
        this.farmUser = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load farm user data';
        this.loading = false;
        console.error('Error loading farm user:', err);
      }
    });

    this.route.params.pipe(
      switchMap(params => {
        const accessToken = params['token'];
      
        return this.farmService.getUserFarmInfo(accessToken);
      })
    ).subscribe({
      next: (user) => {
        this.farmUser = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load farm user data';
        this.loading = false;
        console.error('Error loading farm user:', err);
      }
    });
  }
}
