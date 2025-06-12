import { Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignupPageComponent } from './component/signup-page/signup-page.component';
import { DashboardPageComponent } from './component/dashboard-page/dashboard-page.component';
import { FarmPageComponent } from './component/farm-page/farm-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';

export const routes: Routes = [
  
  { path: 'home-page', component: HomePageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'signup-page', component: SignupPageComponent },
  { path: 'dashboard-page', component: DashboardPageComponent},
  { path: 'farm-page/:id/:location/:size/:name', component: FarmPageComponent},
  { path: 'profile-page', component: ProfilePageComponent},
  { path: '**', redirectTo: 'home-page' } 

];  


