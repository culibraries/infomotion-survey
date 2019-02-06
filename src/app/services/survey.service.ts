import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private csrfToken : string;
  constructor(private http:HttpClient,private cookieService: CookieService) { 
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  createSurvey(survey: Survey)
  {
    console.log(survey);
    return this.http.post(
      'http://localhost/api/data_store/data/infomotion/survey/.json',
      survey,
      { 
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
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
