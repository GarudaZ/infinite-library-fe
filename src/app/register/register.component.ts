import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  submitted = false;
  passWord: string = '';
  userName: string = '';
  errorMessage: string = '';
  success = false;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.submitted = true;
    this.userService
      .registerUser({ username: this.userName, password: this.passWord })
      .subscribe({
        next: (res) => {
          this.submitted = false;
          this.success = true;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: (error) => {
          console.error('Encountered an error', error);
          this.submitted = false;
          this.errorMessage = error.error.message;
        },
      });
  }
}
