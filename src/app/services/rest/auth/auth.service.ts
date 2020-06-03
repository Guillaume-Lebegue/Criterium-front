import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  public api = 'http://localhost:3000/api/';
  public auth = 'auth/';

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  isLoggedIn() {
    return !!(localStorage.getItem('loggedInUser') && localStorage.getItem('id_token'));
  }

  signup(signupData) {
    return this.http.post(`${this.api}${this.auth}signup`, signupData)
      .pipe(map(res => res['token']));
  }

  signin(signinData) {
    return this.http.post(`${this.api}${this.auth}signin`, signinData)
      .pipe(map(res => res['token']));
  }

  setAuthTokens(token) {
    const user = this.getUser(token);
    localStorage.setItem('loggedInUser', user.email);
    localStorage.setItem('id_token', token);
  }

  getUser(token) {
    return this.jwtHelperService.decodeToken(token);
  }
}
