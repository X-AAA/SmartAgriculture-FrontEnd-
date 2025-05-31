import { Data } from "@angular/router";


export interface User {
    dateOfBirth: Data;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
