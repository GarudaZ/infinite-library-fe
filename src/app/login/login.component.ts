import { Component } from '@angular/core';
//remove unused
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
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
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    this.submitted = true;
    console.log('Username:', this.userName);
    console.log('Password:', this.password);

    if (this.userName && this.password) {
      this.authService.login(this.userName, this.password).subscribe(() => {
        this.userService.loadUser();
        this.router.navigateByUrl('/home');
      });
    }
  }



  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
