import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { User } from './user.model';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup-page',
  imports: [FormsModule, CommonModule, NgIf, ReactiveFormsModule,RouterModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})

export class SignupPageComponent {
registerForm: FormGroup;
  


  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor( private readonly router:Router ,private readonly registerService: RegisterService, private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[@!?*.]/)] ],
      birthDate: ['', Validators.required]
    });
  }

  onSubmit() {
    // Reset messages and set loading state
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      // Create the user object locally for submission.
      // Ensure your User class has a constructor matching these arguments.

  const userRegister: User = {
  dateOfBirth: formValues.birthDate,
  firstName: formValues.firstName,
  lastName: formValues.lastName,
  email: formValues.email,
  password: formValues.password
};
      

      // Call the service AND subscribe to trigger the request and handle the response.
      this.registerService.registerUser(userRegister).subscribe({
        next: (response) => {
          // Handle successful registration
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful!';
          this.isLoading = false;
          // Optionally reset the form
          this.registerForm.reset();
          setTimeout(() => {
          this.router.navigate(['/login-page']); // Adjust route as needed
        }, 1000);
        },
        error: (error) => {
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
