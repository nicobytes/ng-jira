import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '@models/user.model';
import { IsAvailableResponse, LoginResponse } from '@models/login.model';
import { TokenService } from '@auth/services/token.service';
import { UserService } from '@auth/services/user.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  apiUrl = `${environment.API_URL}/api/v1/auth`;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  isAvailable(email: string) {
    return this.http.post<IsAvailableResponse>(`${this.apiUrl}/is-available`, {
      email,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.setAuthState(response.user);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.userService
      .create(name, email, password)
      .pipe(switchMap(() => this.login(email, password)));
  }

  setAuthState(user: User | null) {
    this.user.next(user);
  }

  sendLink(email: string) {
    return of({
      email,
      name: 'Nicolas',
    }).pipe(delay(2000));
  }

  restoreSession() {
    const token = this.tokenService.getToken();
    if (token) {
      this.getProfile().subscribe();
    }
  }

  getProfile() {
    return this.http
      .get<User>(`${this.apiUrl}/profile`)
      .pipe(tap((user) => this.setAuthState(user)));
  }

  logout() {
    this.tokenService.clearToken();
    this.setAuthState(null);
  }
}
