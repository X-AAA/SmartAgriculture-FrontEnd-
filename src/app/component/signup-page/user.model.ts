import { Data } from "@angular/router";
import { LoginResponse } from "../login-page/LoginResponse.model";


export class User {
   private dateOfBirth: Data;
   private firstName: string;
   private lastName: string;
   private email: string;
   private password: string;
   private accountCreationDate: Date;
   private loginResponse?: LoginResponse;

    constructor(dateOfBirth: Data, firstName: string, lastName: string, email: string, password: string) {
        this.dateOfBirth = dateOfBirth;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.accountCreationDate = new Date();
    }
    setLoginResponse(loginResponse: LoginResponse) {
        this.loginResponse = loginResponse;
    }
}
