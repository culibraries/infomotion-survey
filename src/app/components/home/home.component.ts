import { Component } from '@angular/core';
import { EmotionUrl } from '../../models/emotionurl';
import { Survey } from '../../models/survey';
import { ApiService } from 'src/app/services/api.service';
import { env } from '../../../environments/environment';

const url = '/data_store/data/infomotion/survey/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  positiveURL: string;
  neutralURL: string;
  negativeURL: string;
  isShow: boolean = false;
  isContentShow: boolean = true;

  alert: any = {};
  isEnableAlert: boolean = false;
  survey: Survey = new Survey('', '', '', '');
  private positive = new EmotionUrl('happy.png', 'happy-active.png');
  private negative = new EmotionUrl('sad.png', 'sad-active.png');
  private neutral = new EmotionUrl('calm.png', 'calm-active.png');

  private flag: boolean = true;
  private time: Date;

  constructor(private apiService: ApiService) {
    this.positiveURL = this.positive.getURL();
    this.neutralURL = this.neutral.getURL();
    this.negativeURL = this.negative.getURL();
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

  public onSubmit({ value }: { value: Survey }) {
    this.time = new Date();
    this.survey.comment = value.comment;
    this.survey.created_date = this.time.toISOString().substring(0, 10);
    this.survey.timestamp = this.time.toLocaleTimeString();
    this.createSurvey(this.survey);
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

  private createSurvey(survey: Survey) {
    try {
      this.apiService
        .post(url, survey)
        .subscribe(
          data => this.showAlert('success'),
          err => this.showAlert('fail'),
          () => console.log('Request Complete')
        );
      window.setTimeout(function() {
        location.reload();
      }, env.delayTime);
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
          title: 'Thank You!',
          message: 'Your feedback has been successfully submitted.',
          src: 'checked.png'
        };
        break;
      case 'fail':
        this.alert = {
          title: 'Oop!',
          message:
            'Something went wrong. Please referesh the app or reach out to LIT for further information.',
          src: 'alert.png'
        };
        break;
      default:
    }
    return this.alert;
  }
}
