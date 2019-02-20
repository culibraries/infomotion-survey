import { Component, Input } from '@angular/core';
import { EmotionUrl } from '../../models/emotionurl';
import { Survey } from '../../models/survey';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = env.apiUrl + '/infomotion/survey/.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public positiveURL: string;
  public neutralURL: string;
  public negativeURL: string;

  private positive = new EmotionUrl('happy.png', 'happy-active.png');
  private negative = new EmotionUrl('sad.png', 'sad-active.png');
  private neutral = new EmotionUrl('calm.png', 'calm-active.png');

  public isShow: boolean = false;
  public isContentShow: boolean = true;
  private flag: boolean = true;
  private time: Date;
  private survey: Survey = new Survey('', '', '', '');
  private csrfToken: string = '';
  public isEnableAlert: boolean = false;
  public alert: any = {};

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private authService: AuthService) {
    this.authService.getUserInformation().subscribe(
      (data: any) => {
        console.log(data);
        if (!this.isInfoUser(data['groups'])) {
          this.router.navigate(['401']);
        }
      });
    this.positiveURL = this.positive.getURL();
    this.neutralURL = this.neutral.getURL();
    this.negativeURL = this.negative.getURL();
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  private isInfoUser(data: any[]): boolean {
    if (data.indexOf('infomotion-admin') === -1 && data.indexOf('infomotion-user') === -1) {
      return false;
    }
      return true;
  }

  /**
   * Toggle the emotion icon
   */
  public toggleEmotion(emotion: string) {
    this.flag = false;
    this.survey.response = emotion;
    if (emotion === 'positive') {
      if (this.positive.getURL() === this.positiveURL) {
        this.positiveURL = this.positive.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.negativeURL = this.negative.getURL();
        this.flag = true;
      } else {
        this.positiveURL = this.positive.getURL();
      }
    }
    if (emotion === 'negative') {
      if (this.negative.getURL() === this.negativeURL) {
        this.negativeURL = this.negative.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.positiveURL = this.positive.getURL();
        this.flag = true;
      } else {
        this.negativeURL = this.negative.getURL();
      }
    }
    if (emotion === 'neutral') {
      if (this.neutral.getURL() === this.neutralURL) {
        this.neutralURL = this.neutral.getURLActive();
        this.negativeURL = this.negative.getURL();
        this.positiveURL = this.positive.getURL();
        this.flag = true;
      } else {
        this.neutralURL = this.neutral.getURL();
      }
    }
    this.checkCommentBoxShow(this.flag);
  }

  /**
   * Toggle the comment box base on click action to each icon
   */
  private checkCommentBoxShow(flag: boolean): void {
    if (flag) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  public onSubmit({ value }: { value: Survey; }) {
    this.time = new Date();
    this.survey.comment = value.comment;
    this.survey.created_date = this.time.toISOString().substring(0, 10);
    this.survey.timestamp = this.time.toLocaleTimeString();
    this.createSurvey(this.survey);
  }

  private createSurvey(survey: Survey) {
    try {
      this.http.post(url, survey,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRFToken': this.csrfToken
          })
        })
        .subscribe(
          data => this.showAlert('success'),
          err => this.showAlert('fail'),
          () => console.log('Request Complete')
        );
      window.setTimeout(function () { location.reload(); }, env.delayTime);
      return true;
    } catch {
      this.showAlert('fail');
    }
  }

  private showAlert(type: string) {
    this.isContentShow = false;
    this.isEnableAlert = true;
    switch (type) {
      case 'success':
        this.alert = {
          'title': 'Thank You!',
          'message': 'Your feedback has been successfully submitted.',
          'src': 'checked.png'
        };
        break;
      case 'fail':
        this.alert = {
          'title': 'Oop!',
          'message': 'Something went wrong. Please referesh the app or reach out to LIT for further information.',
          'src': 'alert.png'
        };
        break;
      default:
    }
    return this.alert;
  }
}
