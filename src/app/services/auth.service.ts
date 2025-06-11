import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredential } from '../component/login-page/credential.modul';
import { LoginResponse } from '../component/login-page/LoginResponse.model';
import { environment } from '../../environments/environment';
import { User } from '../component/signup-page/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


 
   constructor(private readonly http: HttpClient) {}

 private readonly signupUrl:string = `${environment.apiUrl}/identity/RegisterNewFarmer`;
  private readonly LoginUrl:string =`${environment.apiUrl}/identity/login`; 

  loginUser(obj: UserCredential): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.LoginUrl, obj);}


  registerUser(obj: User): Observable<User>{
    return this.http.post<User>(this.signupUrl, obj);
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
