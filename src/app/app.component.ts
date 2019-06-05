import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
const token = localStorage.getItem('token');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisplay: boolean = true;
  isDashboardIconDisplay: boolean = true;
  isAdmin: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        if (data.url === '/login') {
          this.isDisplay = false;
        } else {
          this.isDisplay = true;
        }
      }

      this.isAdmin = this.authService.isAdmin(token);
    });
  }
}
