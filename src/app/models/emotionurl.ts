import { Emotion } from './emotion';

export class EmotionUrl {
    url: string;
    urlActive: string;
    active: boolean;

    constructor(url: string, urlActive: string)
    {
        this.url = url;
        this.urlActive = urlActive;
        this.active = false;
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
