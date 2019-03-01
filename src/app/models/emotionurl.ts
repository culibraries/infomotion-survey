export class EmotionUrl {
    url: string;
    urlActive: string;
    private assetsPath: string = 'assets/images/emotion/';

    constructor(url: string, urlActive: string) {
        this.url = this.assetsPath + url;
        this.urlActive = this.assetsPath + urlActive;
    }

    /**
     * Get Original URL
     */
    public getURL(): string {
        return this.url;
    }

    /**
     * Get Active URL
     */
    public getURLActive(): string {
        return this.urlActive;
    }


}
