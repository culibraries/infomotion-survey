import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const userUrl = env.baseUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * isAuthenticated()
   * TODO : This is not really a perfect way to handle authentication. This function suppose to return a boolean value
   * which is : TRUE -> is authenticated, FALSE -> is not authenticated.
   * In order to do that, the backend need to response 401 code -> unauthozied (FALSE) , 200 code -> success (TRUE)
   */
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => void 0,
      err => this.login(), // This will redirect to the system login page
      () => void 0
    );
  }

  public getUserInformation() {
    return this.http.get(userUrl);
  }

  public login() {
    return window.location.href = env.apiAuthUrl + '/login/?next=/infomotion';
  }

  public logout() {
    return window.location.href = env.apiAuthUrl + '/logout/?next=' + env.apiAuthUrl + '/login/?next=/infomotion';

  }

}
