import { Component, OnInit } from '@angular/core';
import { EmotionUrl} from '../../models/emotionurl';
import { Survey } from '../../models/survey';
import { SurveyService} from '../../services/survey.service';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public positiveURL: string;
  public neutralURL: string;
  public negativeURL: string;
  private assetsPath = 'assets/images/emotion/';

  private positive = new EmotionUrl(this.assetsPath + 'happy.png', this.assetsPath + 'happy-active.png');
  private negative = new EmotionUrl(this.assetsPath + 'sad.png', this.assetsPath + 'sad-active.png');
  private neutral = new EmotionUrl(this.assetsPath + 'calm.png', this.assetsPath + 'calm-active.png');

  public isShow: boolean = false;
  public isContentShow: boolean;
  public isSuccessNotificationShow: boolean;
  public isAlertNotificationShow: boolean;
  private flag: boolean = true;
  private time: Date;
  private survey: Survey;
  public isAdmin: boolean = false;

  constructor(private router: Router, public surveyService: SurveyService, private authService: AuthService) {
    this.survey = new Survey('', '', '');
    this.positiveURL = this.positive.getURL();
    this.neutralURL = this.neutral.getURL();
    this.negativeURL = this.negative.getURL();
    this.authService.getUserInformation().subscribe(
      (data: any) => {
        if (data['groups'].indexOf('infomotion-admin') === -1 && data['groups'].indexOf('infomotion-user') === -1) {
          this.router.navigate(['401']);
        }
        if (data['groups'].indexOf('infomotion-admin') !== -1) {
            this.isAdmin = true;
        }
      });
    this.isContentShow = surveyService.isContentShow;
    this.isSuccessNotificationShow = surveyService.isSuccessNotificationShow;
    this.isAlertNotificationShow = surveyService.isAlertNotificationShow;
  }

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

    if (this.flag) {
      this.isShow = true;
    } else {
    this.isShow = false;
    }
  }

  public onSubmit({ value }: { value: Survey; }) {
    this.time = new Date();
    this.survey.comment = value.comment;
    this.survey.created_date = this.time.toISOString().substring(0, 10);
    this.surveyService.createSurvey(this.survey);
  }

}
