import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async login() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password');
      return;
    }
  
    try {
      await this.authService.login(this.email, this.password);
      alert('Login successful!');
    } catch (error: any) {
      if (error.code) {
        console.error('Firebase error code:', error.code);
      }
      const errorMessage = error.message || 'An error occurred during login.';
      alert(errorMessage);
    }
  }
}