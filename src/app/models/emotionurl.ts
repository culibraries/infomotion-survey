export class EmotionUrl {
    url: string;
    urlActive: string;

    constructor(url: string, urlActive: string)
    {
        this.url = url;
        this.urlActive = urlActive;
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
