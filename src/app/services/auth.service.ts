import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const userUrl = env.baseUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * isAuthenticated()
   */
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => void 0,
      err => this.login(),
      () => void 0
    );
  }

  public getUserInformation() {
    return this.http.get(userUrl);
  }

  public login() {
    return window.location.href = env.apiAuthUrl + '/login/?next=/infomotion';
  }

  /**
   * logout
   */
  public logout() {
    return window.location.href = env.apiAuthUrl + '/logout/?next=' + env.apiAuthUrl + '/login/?next=/infomotion';

  }

}
