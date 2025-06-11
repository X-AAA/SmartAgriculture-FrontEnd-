import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SoilData } from '../component/farm-page/farm.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoilDataService {

  constructor(private readonly http: HttpClient , private readonly router: Router) { }

  private readonly SoilDataURL: string = `${environment.apiUrl}/farm`;

  addSoildData(farmId:number,fieldId: number,soilData: SoilData, headers: HttpHeaders): Observable<SoilData> {
    return this.http.post<SoilData>(`${this.SoilDataURL}/${farmId}/fields/${fieldId}/soildata`, soilData, { headers });
}

getSoilData(farmId:number,fieldId: number, headers: HttpHeaders): Observable<SoilData> {
  return this.http.get<SoilData>(`${this.SoilDataURL}/${farmId}/fields/${fieldId}/soildata`, { headers });  
}

}
