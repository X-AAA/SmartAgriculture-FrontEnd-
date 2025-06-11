import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Farm } from '../component/farm-page/farm.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private readonly FarmsURL: string = `${environment.apiUrl}/farms`;
  private readonly FarmURL: string = `${environment.apiUrl}/farm`;
  constructor(private readonly http: HttpClient , private readonly router: Router) {}
  FarmInfo(headers: HttpHeaders): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.FarmsURL, { headers });
  }
 
  
  AddFarm(farm: Farm , headers: HttpHeaders): Observable<Farm> {
    return this.http.post<Farm>(this.FarmsURL, farm,{ headers });
  }

  getFarmById(id: number, headers: HttpHeaders): Observable<Farm> {
    return this.http.get<Farm>(`${this.FarmsURL}/${id}`, { headers });
  }
  
  getFarmWeatherById(id: number,city:string, headers: HttpHeaders): Observable<Farm> {
    return this.http.get<Farm>(`${this.FarmURL}/${id}/weather?city=${city}`, { headers });
  }

  EditFarm(id: number, data: Partial<Farm>, headers: HttpHeaders): Observable<Farm> {
    return this.http.patch<Farm>(`${this.FarmsURL}/${id}`, data, { headers });
  }
DeleteFarm(id: number, headers: HttpHeaders): Observable<void> {
  return this.http.delete<void>(`${this.FarmsURL}/${id}`, { headers });
}





}