import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: User | null = null;
  userInitials: string | undefined = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.userService.removeUser();
    this.router.navigateByUrl('/login');
  }
  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.userInitials = user?.username.slice(0, 2).toUpperCase();
    });
  }
}
