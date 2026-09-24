import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      correo,
      password
    });
  }
}