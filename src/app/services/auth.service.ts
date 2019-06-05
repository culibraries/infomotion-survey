import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(private apiService: ApiService) {}

  isAuthenticated(token?: string): boolean {
    const getToken = token ? token : localStorage.getItem('token');

    if (!this.jwtHelper.isTokenExpired(getToken)) {
      const tokenPayload = this.jwtHelper.decodeToken(getToken);
      if (
        tokenPayload.groups.includes('admin-infomotion') ||
        tokenPayload.groups.includes('staff-infomotion')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      if (tokenPayload.groups.includes('admin-infomotion')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isStaff(token: string): boolean {
    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      if (tokenPayload.groups.includes('staff-infomotion')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return tokenPayload.username;
  }

  isUser(currentUser: string): boolean {
    const token = localStorage.getItem('token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return currentUser === tokenPayload.username ? true : false;
  }

  isTokenExist(): boolean {
    return localStorage.hasOwnProperty('token');
  }

  login(username: string, password: string) {
    return this.apiService.post('/token/', { username, password }).pipe(
      map(data => {
        localStorage.setItem('token', data.access);
      })
    );
  }
}
