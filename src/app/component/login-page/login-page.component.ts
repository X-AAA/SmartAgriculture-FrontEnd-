import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import {  UserCredential } from './credential.modul';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule, NgIf, ReactiveFormsModule , RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
onGoogleLogin() {
throw new Error('Method not implemented.');
}
onAppleLogin() {
throw new Error('Method not implemented.');
}
onSignUp($event: MouseEvent) {
throw new Error('Method not implemented.');
}



  loginForm: FormGroup;


  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor( private readonly router:Router ,private readonly loginService: AuthService, private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required] ],
     
    });
  }

 

  onSubmit() {
      // Reset messages and set loading state
    this.errorMessage = null;
    this.successMessage = null;

    // Mark all fields as touched to trigger validation messages if needed
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.isLoading = true; // Set loading state
      const formValues = this.loginForm.value;

      // Create the credential object for the service
      // Ensure the type matches what your LoginService expects (Credential or UserCredential)
   


     const userCredential: UserCredential = {
       email: formValues.email,
      password: formValues.password,
      
    };

   
   
   
      // Call the login service
      this.loginService.loginUser(userCredential).subscribe({
        next: (Response) => {
          // Handle successful login
          this.isLoading = false;
          this.successMessage = 'Login successful!';
          console.log('Login successful:', Response);

          const accessToken = Response.accessToken; 


          if (accessToken) {
            // Store the token in localStorage
            localStorage.setItem('accessToken', accessToken);
            console.log('Token :', accessToken);
            
            // Navigate after successful login and token storage
            this.router.navigate(['/dashboard-page']);
          } else {
            console.error('Login successful, but no token received.');
            this.errorMessage = 'Login succeeded but failed to retrieve token.';
          }

        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);

          if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check your internet connection.';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid email or password format.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else if (error.status === 403) {
            this.errorMessage = 'Account is locked. Please contact support.';
          } else if (error.status === 404) {
            this.errorMessage = 'Account not found. Please check your email or sign up.';
          } else if (error.status === 429) {
            this.errorMessage = 'Too many login attempts. Please try again later.';
          } else if (error.status >= 500) {
            this.errorMessage = 'Server error. Please try again later.';
          } else {
            this.errorMessage = 'Login failed. Please try again later.';
          }
        },
        complete: () => {
          // Optional: Code to run after success or error, regardless of outcome
          this.isLoading = false; // Ensure loading is stopped even if complete block runs
        }
      });

    } else {
      // Form is invalid, log or show a general message if needed
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.error('Login form is invalid');
    }
  }
  
  // Method for the 'Forgot Password' button
  onForgotPassword() {
    console.log('Forgot Password button clicked');
    this.router.navigate(['/forgot-password']);
  }

  
 
}
