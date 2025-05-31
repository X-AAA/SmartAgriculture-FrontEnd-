import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Farm } from '../component/farm-page/farm.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DashBoardURL: string = `${environment.apiUrl}/farms`;

 


  constructor(private readonly http: HttpClient , private readonly router: Router) {}
  FarmInfo(headers: HttpHeaders): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.DashBoardURL, { headers });
  }
 
  
  AddFarm(farm: Farm , headers: HttpHeaders): Observable<Farm> {
    return this.http.post<Farm>(this.DashBoardURL, farm,{ headers });
  }

  getFarmById(id: number, headers: HttpHeaders): Observable<Farm> {
    return this.http.get<Farm>(`${this.DashBoardURL}/${id}`, { headers });
  }

  EditFarm(id: number, data: Partial<Farm>, headers: HttpHeaders): Observable<Farm> {
    return this.http.patch<Farm>(`${this.DashBoardURL}/${id}`, data, { headers });
  }
DeleteFarm(id: number, headers: HttpHeaders): Observable<void> {
  return this.http.delete<void>(`${this.DashBoardURL}/${id}`, { headers });
}


getToken(): string | null {
  return localStorage.getItem('accessToken');
}


logout() {
  // Clear authentication data, such as tokens or user information
  localStorage.removeItem('auth_token'); // Example of clearing a token from localStorage
  sessionStorage.removeItem('auth_token'); // If you are using session storage, you can clear that as well
  
  
}

}