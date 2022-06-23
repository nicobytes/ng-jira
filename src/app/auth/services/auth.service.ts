import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkEmail(email: string) {
    return of({
      exists: false,
      email
    }).pipe(
      delay(3000)
    );
  }

  login(email: string, password: string) {
    return of({
      email,
      name: 'Nicolas'
    }).pipe(
      delay(2000)
    );
  }
}
