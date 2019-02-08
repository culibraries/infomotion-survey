import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const userUrl = env.baseUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * isAuthenticated()
   */
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => console.log(data),
      err => this.login(),
      () => console.log('Request Complete')
    );
  }

  private login() {
    return window.location.href = env.apiAuthUrl + '/login/?next=/infomotion';
  }

  /**
   * logout
   */
  public logout() {
    return window.location.href = env.apiAuthUrl + '/logout/?next=' + env.apiAuthUrl + '/login/?next=/infomotion';

  }

}
