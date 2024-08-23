import { Component } from '@angular/core';
//remove unused
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName = '';
  password = '';
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.submitted = true;
    console.log('Username:', this.userName);
    console.log('Password:', this.password);

    if (this.userName && this.password) {
      this.authService.login(this.userName, this.password).subscribe(() => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    }
  }
}
