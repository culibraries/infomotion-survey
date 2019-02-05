import { Emotion } from './emotion';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

export class EmotionUrl {
    emotion: Emotion;
    base64: string;
    base64Active: string;
    url: SafeUrl;
    urlActive: SafeUrl;

    constructor(sanitizer: DomSanitizer,emotion: Emotion,base64: string, base64Active: string)
    {
        this.emotion = emotion;
        this.base64 = base64;
        this.base64Active = base64Active;
        this.url = sanitizer.bypassSecurityTrustResourceUrl(base64);
        this.urlActive = sanitizer.bypassSecurityTrustResourceUrl(base64Active);
    }

    /**
     * name
     */
    public getURL() {
        return this.url;
    }

    /**
     * name
     */
    public getURLActive() {
        return this.urlActive;    
    
    }


}
