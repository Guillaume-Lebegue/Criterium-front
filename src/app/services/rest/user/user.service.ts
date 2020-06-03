import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  public currentUser: any = new BehaviorSubject<User>(null);

  public api = 'http://localhost:3000/api/';
  public user = 'user/';
  public mail = 'mail/';

  constructor(private http: HttpClient) { }

  getUserById(userId): Observable<User> {
    return this.http.get(`${this.api}${this.user}${userId}`)
      .pipe(map(user => new User(user)));
  }

  getUserByEmail(userEmail): Observable<User> {
    return this.http.get(`${this.api}${this.user}${this.mail}${userEmail}`)
      .pipe(map(user => new User(user)));
  }
}
