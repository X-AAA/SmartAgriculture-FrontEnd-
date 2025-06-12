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
    }
  }

  handleSave(field: keyof EditingState): void {
    if (field === 'username') {
      if (this.profileForm.get('username')?.valid) {
        this.profileData.username = this.profileForm.get('username')?.value;
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
      const newPass = this.profileForm.get('newPassword')?.value;
      const confirmPass = this.profileForm.get('confirmPassword')?.value;
      if (newPass === confirmPass && this.profileForm.get('newPassword')?.valid) {
        alert('Password updated successfully!');
        this.passwords = { currentPassword: '', newPassword: '', confirmPassword: '' };
        this.profileForm.get('currentPassword')?.setValue('');
        this.profileForm.get('newPassword')?.setValue('');
        this.profileForm.get('confirmPassword')?.setValue('');
      } else {
        alert('Passwords do not match or are too short (minimum 6 characters)');
        return;
      }
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
}

