import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

//does this match what will be returned by the api?
export interface User {
  success: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>('https://infinite-library.vercel.app/api/users/login', {
        username,
        password,
      })
      .pipe(
        tap((res: User) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult: User): void {
    localStorage.setItem('id_token', authResult.token);
  }

  logout(): void {
    localStorage.removeItem('id_token');
  }
}
