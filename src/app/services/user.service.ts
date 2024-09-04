import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  _id: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadUser();
  }

  loadUser(): void {
    const token: string | null = this.authService.getToken();

    if (token) {
      console.log('decoding');

      const decodedToken = jwtDecode<{
        user_id: string;
        username: string;
        iat: string;
      }>(token);
      const decodedUser: User = {
        username: decodedToken.username,
        _id: decodedToken.user_id,
        created_at: decodedToken.iat,
      };

      this.userSubject.next(decodedUser);
      console.log(decodedToken);
    } else {
      console.log('No token found');
    }
  }

  public getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  public removeUser(): void {
    this.userSubject.next(null);
  }
}
