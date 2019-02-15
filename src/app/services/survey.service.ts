import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { env } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const url = env.apiUrl + '/infomotion/survey/.json';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private csrfToken: string = '';

  private isContentShow: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private isSuccessNotificationShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isAlertNotificationShow: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  /**
   * /POST call to add survey to mongoDb
   */
  public createSurvey(survey: Survey) {
    try {
       this.http.post(
                            url,
                            survey,
                            {
                              headers: new HttpHeaders({
                                  'Content-Type':  'application/json',
                                  'X-CSRFToken': this.csrfToken
                              })
                            })
      .subscribe(
        data => {
                this.isContentShow.next(false);
                this.isSuccessNotificationShow.next(true);
                },
        err => {
        this.showError();
        },
        () => console.log('Request Complete')
      );
      window.setTimeout(function() {location.reload(); }, env.delayTime);
      return true;
    } catch {
      this.showError();
      }
    }

  private showError(): void {
    this.isContentShow.next(false);
    this.isAlertNotificationShow.next(true);
    }

  public getIsContentShow(): Observable<boolean> {
    return this.isContentShow.asObservable();
  }
  public getIsSuccessNotificationShow(): Observable<boolean> {
    return this.isSuccessNotificationShow.asObservable();
  }
  public getIsAlertNotificationShow(): Observable<boolean> {
    return this.isAlertNotificationShow.asObservable();
  }

}
