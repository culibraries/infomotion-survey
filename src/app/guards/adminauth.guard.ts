import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  constructor(private auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!token) {
      this.router.navigate(['login']);
    } else {
      if (!this.auth.isAdmin(token)) {
        this.router.navigate(['401']);
        return false;
      } else {
        return true;
      }
    }
  }
}
