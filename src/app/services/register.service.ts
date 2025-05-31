import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../component/signup-page/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) {}
  
 private readonly signupUrl:string = `${environment.apiUrl}/identity/RegisterNewFarmer`;

  registerUser(obj: User): Observable<User>{
    return this.http.post<User>(this.signupUrl, obj);
  }

}

   

