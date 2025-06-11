import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recommendation, WeatherReadings,SoilData } from '../component/farm-page/farm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private readonly http: HttpClient) { }

  private readonly RecommendationURL: string = `${environment.apiUrl}/farm`;

  getRecommendations(farmId: number, fieldId: number ,headers: HttpHeaders): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${this.RecommendationURL}/${farmId}/fields/${fieldId}/Recommendation`, { headers });
  }

  
}
