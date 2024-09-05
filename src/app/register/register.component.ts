import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
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

  constructor(private userService: UserService) {}

  register() {
    this.errorMessage = '';
    this.submitted = true;
    this.userService
      .registerUser({ username: this.userName, password: this.passWord })
      .subscribe({
        next: (res) => {
          this.submitted = false;
        },
        error: (error) => {
          console.error('Encountered an error', error);
          this.submitted = false;
          this.errorMessage = error.error.message;
        },
      });
  }
}
