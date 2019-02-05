import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Emotion } from '../app/models/emotion';
import { EmotionUrl} from '../app/models/emotionurl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
 
  private positiveURL: string; 
  private neutralURL: string;
  private negativeURL : string;
  private assetsPath = "assets/images/emotion/";

  private positive = new EmotionUrl(this.assetsPath + "happy.png",this.assetsPath + "happy-active.png");
  private negative = new EmotionUrl(this.assetsPath + "sad.png",this.assetsPath + "sad-active.png");
  private neutral = new EmotionUrl(this.assetsPath + "calm.png",this.assetsPath + "calm-active.png");
  
  private isShow: boolean;
  private flag: boolean;

  constructor() {
    this.positiveURL = this.positive.getURL();
    this.neutralURL = this.neutral.getURL();
    this.negativeURL = this.negative.getURL();

    this.flag = true;
    this.isShow = false;
  }

  toggleEmotion(emotion: number){
    
    if (emotion == 1)
    {
      this.flag = false;
      if (this.positive.getURL() === this.positiveURL)
      {
        this.positiveURL = this.positive.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.negativeURL = this.negative.getURL();
        this.flag = true;
      }
      else this.positiveURL = this.positive.getURL();
    }
    if (emotion == -1)
    {
      this.flag = false;
      if (this.negative.getURL() === this.negativeURL)
      {
        this.negativeURL = this.negative.getURLActive();
        this.neutralURL = this.neutral.getURL();
        this.positiveURL = this.positive.getURL();
        this.flag = true;
      }
      else this.negativeURL = this.negative.getURL();
    }
    if (emotion == 0)
    {
      this.flag = false;
      if (this.neutral.getURL() === this.neutralURL)
      {
        this.neutralURL = this.neutral.getURLActive();
        this.negativeURL = this.negative.getURL();
        this.positiveURL = this.positive.getURL();
        this.flag = true;
      }
      else this.neutralURL = this.neutral.getURL();
    }

    if (this.flag) this.isShow = true;
    else this.isShow = false;

  }


  

  
}
