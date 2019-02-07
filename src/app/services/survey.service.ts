import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private csrfToken: string;
  private url: string;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.csrfToken = this.cookieService.get('csrftoken');
    this.url = env.apiUrl + '/infomotion/survey/.json';
  }

/**
 * /POST call to add survey to mongoDb
 */
public createSurvey(survey: Survey) {
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
      data => console.log(data),
      err => console.log(err),
      () => console.log('Request Complete')
    );

  }
}
