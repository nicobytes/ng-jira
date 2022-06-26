import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.API_URL}/api/v1/users`;

  constructor(
    private http: HttpClient
  ) { }

  create(name: string, email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}`, { name, email, password });
  }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
