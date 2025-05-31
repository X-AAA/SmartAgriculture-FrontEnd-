import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FarmUser {
  id: number;
  name: string;
  farmDetails: {
    farmName: string;
    location: string;
    size: number;
    crops: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  readonly FarmUrl:string = `${environment.apiUrl}/farms/users`; 
 

  constructor(private readonly http: HttpClient) { }

  getUserFarmInfo(userId: number): Observable<FarmUser> {
    return this.http.get<FarmUser>(`${this.FarmUrl}/${userId}`);
  }
}
