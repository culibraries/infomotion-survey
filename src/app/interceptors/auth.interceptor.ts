import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.status === 200) {
              const token =
                typeof event.body.access !== 'undefined'
                  ? event.body.access
                  : localStorage.getItem('token');

              if (!this.auth.isAuthenticated(token)) {
                alert('You are not authorized to access this application');
                this.router.navigate(['/login']);
              }
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
              if (error.error.code && error.error.code === 'token_not_valid') {
                alert('You are out of session ! Please log back in');
              } else {
                alert('No active account found with the given credentials');
              }
            } else {
              alert(
                'Error ! Please create a ticket to LIT for further assitance'
              );
            }
            this.router.navigate(['/login']);
            return;
          }
        }
      )
    );
  }
}
