import { Component } from '@angular/core';
import { EmotionUrl} from '../app/models/emotionurl';
import { Survey } from '../app/models/survey';
import { SurveyService} from '../app/services/survey.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public positiveURL: string;
  public neutralURL: string;
  public negativeURL: string;
  private assetsPath = 'assets/images/emotion/';

  private positive = new EmotionUrl(this.assetsPath + 'happy.png', this.assetsPath + 'happy-active.png');
  private negative = new EmotionUrl(this.assetsPath + 'sad.png', this.assetsPath + 'sad-active.png');
  private neutral = new EmotionUrl(this.assetsPath + 'calm.png', this.assetsPath + 'calm-active.png');
  public isShow: boolean;
  private flag: boolean;
  private time: Date;
  private survey: Survey;

  public isPositiveComment: boolean;
  constructor(private surveyService: SurveyService) {
    this.survey = new Survey(0, '', '');
    this.positiveURL = this.positive.getURL();
    this.neutralURL = this.neutral.getURL();
    this.negativeURL = this.negative.getURL();

    this.flag = true;
    this.isShow = false;
  }

  public toggleEmotion(emotion: number) {
    this.flag = false;
    this.survey.response = emotion;
    if (emotion === 1) {
      if (this.positive.getURL() === this.positiveURL) {
        this.positiveURL = this.positive.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.negativeURL = this.negative.getURL();
        this.flag = true;
        this.isPositiveComment = true;
      } else {
          this.positiveURL = this.positive.getURL();
      }
    }
    if (emotion === -1) {
      if (this.negative.getURL() === this.negativeURL) {
        this.negativeURL = this.negative.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.positiveURL = this.positive.getURL();
        this.flag = true;
      } else {
        this.negativeURL = this.negative.getURL();
      }
    }
    if (emotion === 0) {
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

  public onSubmit({ value, valid }: { value: Survey; valid: boolean }) {
    this.time = new Date();
    this.survey.comment = value.comment;
    this.survey.created_date = this.time.toISOString();
    this.surveyService.createSurvey(this.survey);
  }
}
