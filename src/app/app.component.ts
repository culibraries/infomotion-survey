import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isAdmin: boolean = false;
  constructor (private authService: AuthService) {
    this.authService.getUserInformation().subscribe(
      (data: any) => {
        if (data['groups'].indexOf('infomotion-admin') !== -1) {
          this.isAdmin = true;
        }
      });
  }
}
