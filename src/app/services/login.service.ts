import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredential } from '../component/login-page/credential.modul';
import { LoginResponse } from '../component/login-page/LoginResponse.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private readonly LoginUrl:string =`${environment.apiUrl}/identity/login`; 
   constructor(private readonly http: HttpClient) {}

  loginUser(obj: UserCredential): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.LoginUrl, obj);

}
}
