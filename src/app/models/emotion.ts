import { SafeUrl } from '@angular/platform-browser';

export class Emotion {
    src: SafeUrl;
    active: boolean; 

    constructor()
    {
        this.src = '';
        this.active = false;
    }
}
