import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from './user.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup-page',
  imports: [FormsModule, CommonModule, NgIf, ReactiveFormsModule,RouterModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})

export class SignupPageComponent implements OnInit {
registerForm: FormGroup;
  


  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor( private readonly router:Router ,private readonly registerService: AuthService, private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[@!?*.]/)] ],
      birthDate: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    console.log( this.users);
  }
   users: User[] = [];
  onSubmit() {
    // Reset messages and set loading state
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      // Create the user object locally for submission.
      // Ensure your User class has a constructor matching these arguments.

  
  const userRegister: User = new User(
  formValues.birthDate,
  formValues.firstName,
 formValues.lastName,
 formValues.email,
 formValues.password
  );    
  this.users.push(userRegister);
      // Call the service AND subscribe to trigger the request and handle the response.
      this.registerService.registerUser(userRegister).subscribe({
        next: (response: any) => {
          // Handle successful registration
         
          this.successMessage = 'Registration successful!';
          this.isLoading = false;
          // Optionally reset the form
          this.registerForm.reset();
          setTimeout(() => {
          this.router.navigate(['/login-page']); // Adjust route as needed
        }, 1000);
        },
        error:(error) => {
          // Handle registration error
          
          console.error('Registration failed:', error);
          this.errorMessage = error?.error?.message ?? 'Registration failed. Please try again.'; // Use a more specific error from the response if available
          this.isLoading = false;

        },
        complete: () => {
          // Optional: Code to run when the observable completes (after next/error)
          this.isLoading = false;// Ensure loading is false even if complete is called after error
        }
      });
    } else {
      // Form is invalid, handle appropriately (e.g., mark fields as touched)
      console.error('Form is invalid');
      this.registerForm.markAllAsTouched(); // Show validation errors
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.isLoading = false;
    }
  }

}
