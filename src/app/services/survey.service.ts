import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { env } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private csrfToken: string;
  private url: string;

  public isContentShow: boolean;
  public isSuccessNotificationShow: boolean;
  public isAlertNotificationShow: boolean;

  private contentShow: Subject<boolean> = new Subject<boolean>();
  private successNotificationShow: Subject<boolean> = new Subject<boolean>();
  private alertNoticifactionShow: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.csrfToken = this.cookieService.get('csrftoken');
    this.url = env.apiUrl + '/infomotion/survey/.json';

    this.isContentShow = true;
    this.isSuccessNotificationShow = false;
    this.isAlertNotificationShow = false;

    this.contentShow.subscribe((value) => {
      this.isContentShow = value;
    });
    this.successNotificationShow.subscribe((value) => {
      this.isSuccessNotificationShow = value;
    });
    this.alertNoticifactionShow.subscribe((value) => {
      this.isAlertNotificationShow = value;
    });

  }

/**
 * /POST call to add survey to mongoDb
 */
public createSurvey(survey: Survey) {
  try {
    return this.http.post(
                          this.url,
                          survey,
                          {
                            headers: new HttpHeaders({
                                'Content-Type':  'application/json',
                                'X-CSRFToken': this.csrfToken
                            })
                          })
    .subscribe(
      data => {
              this.isContentShow = false;
              this.isSuccessNotificationShow = true;
              window.setTimeout(function() {location.reload(); }, 4000);
              },
      err => {
        this.isContentShow = false;
        this.isAlertNotificationShow = true;
        window.setTimeout(function() {location.reload(); }, 4000);
      },
      () => console.log('Request Complete')
    ); } catch {
      this.isContentShow = false;
      this.isAlertNotificationShow = true;
      window.setTimeout(function() {location.reload(); }, 4000);
    }
  }
}
