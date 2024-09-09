import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService, User } from './services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'infinite-library-fe';
  user: User | null = null;
  userInitials: string | undefined = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.userInitials = user?.username.slice(0, 2).toUpperCase();
    });
  }
}
