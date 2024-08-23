import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

export interface TokenResponse {
  success: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(
        'https://infinite-library.vercel.app/api/users/login',
        {
          username,
          password,
        }
      )
      .pipe(
        tap((res: TokenResponse) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult: TokenResponse): void {
    localStorage.setItem('id_token', authResult.token);
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  logout(): void {
    localStorage.removeItem('id_token');
  }
}
