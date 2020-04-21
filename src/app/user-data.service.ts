import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  register(tusername: string, temail: string, tpassword: string) {
    let body = {
      userName: tusername,
      email: temail,
      password: tpassword
    };
    return this.http.post(`${environment.apiUrl}/Auth/Register`, body);
  }

  modifyUser(
    tusername: string,
    temail: string,
    tpassword: string,
    tcurrentPassword: string
  ) {
    let body = {
      userName: tusername,
      email: temail,
      password: tpassword,
      currentPassword: tcurrentPassword
    };
    return this.http.post(`${environment.apiUrl}/UserProfile`, body);
  }

  login(formData) {
    return this.http.post(`${environment.apiUrl}/Auth/Login`, formData);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiUrl}/UserProfile`);
  }
}
