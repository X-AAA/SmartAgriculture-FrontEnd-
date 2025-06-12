import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface ProfileData {
  username: string;
  email: string;
  profilePicture: string | null;
}

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditingState {
  username: boolean;
  email: boolean;
  password: boolean;
}

@Component({
  selector: 'app-profile-page',
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private readonly router: Router,
    private readonly fb: FormBuilder) { }

  profileForm!: FormGroup;

  profileData: ProfileData = {
    username: 'johndoe',
    email: 'john.doe@example.com',
    profilePicture: null
  };

  passwords: Passwords = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  isEditing: EditingState = {
    username: false,
    email: false,
    password: false
  };

  ngOnInit(): void {
    this.initializeForms();
    this.loadThemePreference();
    this.applyThemeToDocument();
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
    } else if (savedTheme === 'light') {
      this.isDarkMode = false;
    } else {
      // Check system preference if no saved theme
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  saveThemePreference(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemePreference();
    this.applyThemeToDocument();
  }

  private applyThemeToDocument(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      username: new FormControl(this.profileData.username, Validators.required),
      email: new FormControl(this.profileData.email, [Validators.required, Validators.email]),
      currentPassword: new FormControl(this.passwords.currentPassword),
      newPassword: new FormControl(this.passwords.newPassword, Validators.minLength(6)),
      confirmPassword: new FormControl(this.passwords.confirmPassword)
    });
  }

  onProfilePictureChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileData.profilePicture = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleEdit(field: keyof EditingState): void {
    this.isEditing[field] = true;
    if (field === 'username') {
      this.profileForm.get('username')?.setValue(this.profileData.username);
    } else if (field === 'email') {
      this.profileForm.get('email')?.setValue(this.profileData.email);
    } else if (field === 'password') {
      // Clear password fields when starting to edit
      this.profileForm.get('currentPassword')?.setValue('');
      this.profileForm.get('newPassword')?.setValue('');
      this.profileForm.get('confirmPassword')?.setValue('');
    }
  }

  handleSave(field: keyof EditingState): void {
    if (field === 'username') {
      if (this.profileForm.get('username')?.valid) {
        const newUsername = this.profileForm.get('username')?.value;
        if (newUsername.trim().length < 3) {
          alert('Username must be at least 3 characters long.');
          return;
        }
        this.profileData.username = newUsername.trim();
      } else {
        alert('Username is required.');
        return;
      }
    } else if (field === 'email') {
      if (this.profileForm.get('email')?.valid) {
        this.profileData.email = this.profileForm.get('email')?.value;
      } else {
        alert('Valid email is required.');
        return;
      }
    } else if (field === 'password') {
      const currentPass = this.profileForm.get('currentPassword')?.value;
      const newPass = this.profileForm.get('newPassword')?.value;
      const confirmPass = this.profileForm.get('confirmPassword')?.value;
      
      if (!currentPass) {
        alert('Current password is required.');
        return;
      }
      
      if (!newPass || newPass.length < 6) {
        alert('New password must be at least 6 characters long.');
        return;
      }
      
      if (newPass !== confirmPass) {
        alert('New password and confirmation do not match.');
        return;
      }
      
      // Here you would typically call an API to verify current password and update
      alert('Password updated successfully!');
      
      // Clear password fields after successful update
      this.passwords = { currentPassword: '', newPassword: '', confirmPassword: '' };
      this.profileForm.get('currentPassword')?.setValue('');
      this.profileForm.get('newPassword')?.setValue('');
      this.profileForm.get('confirmPassword')?.setValue('');
    }
    this.isEditing[field] = false;
  }

  handleCancel(field: keyof EditingState): void {
    if (field === 'username') {
      this.profileForm.get('username')?.setValue(this.profileData.username);
    } else if (field === 'email') {
      this.profileForm.get('email')?.setValue(this.profileData.email);
    } else if (field === 'password') {
      this.profileForm.get('currentPassword')?.setValue('');
      this.profileForm.get('newPassword')?.setValue('');
      this.profileForm.get('confirmPassword')?.setValue('');
    }
    this.isEditing[field] = false;
  }

  goBack(): void {
    window.history.back();
  }

  getInitials(): string {
    return this.profileData.username.charAt(0).toUpperCase();
  }

  // Utility method to get current theme as string
  getCurrentTheme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }

  // Method to check if a specific field is being edited
  isFieldEditing(field: keyof EditingState): boolean {
    return this.isEditing[field];
  }

  // Method to get form control errors for better error handling
  getFieldError(fieldName: string): string | null {
    const control = this.profileForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName} is required.`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (control.errors['minlength']) {
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters long.`;
      }
    }
    return null;
  }
}

