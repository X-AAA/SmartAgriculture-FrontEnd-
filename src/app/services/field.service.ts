import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {  Field } from '../component/farm-page/farm.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private readonly FieldURL: string = `${environment.apiUrl}/farm`;

 


  constructor(private readonly http: HttpClient , private readonly router: Router) {}

  addField(farmId:number,field: Field, headers: HttpHeaders): Observable<Field> {
    return this.http.post<Field>(`${this.FieldURL}/${farmId}/fields`, field, { headers });
  }

  FieldInfo(id: number, headers: HttpHeaders): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.FieldURL}/${id}/fields`, { headers });
  }
 
  

  
getFieldById(farmId:number,fieldId: number, headers: HttpHeaders): Observable<Field> {
    return this.http.get<Field>(`${this.FieldURL}/${farmId}/fields/${fieldId}`, { headers });
}

DeleteField(  fieldId: number,farmId:number, headers: HttpHeaders): Observable<void> {
  return this.http.delete<void>(`${this.FieldURL}/${farmId}/fields/${fieldId}`, { headers });
}

}


