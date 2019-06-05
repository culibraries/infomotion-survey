import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor() {
    localStorage.removeItem('token');
    window.location.replace(location.pathname);
  }
}
