import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password');
      return;
    }
  
    try {
      await this.authService.register(this.email, this.password);
      alert('Registration successful!');
    } catch (error: any) {
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      const errorMessage = error.message || 'An error occurred during registration.';
      alert(errorMessage);
    }
  }
}
