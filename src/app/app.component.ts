import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AppearanceService} from "./services/appearance.service";

import {Plugins} from '@capacitor/core';
const {SplashScreen} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    languages: string[] = ['de', 'en', 'it', 'fr'];

    constructor(
        private platform: Platform,
        private translate: TranslateService,
        private appearanceService: AppearanceService) {
        this.setLocales();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.setAppearance();
            SplashScreen.hide().then(r => {
            });
        });
    }



    private setAppearance() {
        const darkmodeString = localStorage.getItem('darkmodeEnabled');
        if (!!darkmodeString){
            const darkmodeEnabled = JSON.parse(darkmodeString);
            if (darkmodeEnabled === false) {
                localStorage.removeItem('darkmodeEnabled');
            }
            if (darkmodeEnabled) {
                this.appearanceService.dark();
            }
        } else {
            const mql = window.matchMedia("(prefers-color-scheme: dark)");
            mql.matches ? this.appearanceService.dark() : this.appearanceService.light();
        }
    }


    private setLocales() {
        const customLocale = localStorage.getItem('customLocale');
        if (customLocale !== null) {
            this.translate.setDefaultLang(customLocale);
        } else {
            if (this.languages.includes(this.translate.getBrowserLang().substr(0, 2))) {
                this.translate.setDefaultLang(this.translate.getBrowserLang());
                localStorage.setItem('customLocale', this.translate.getBrowserLang().substr(0, 2));
            } else {
                this.translate.setDefaultLang('en');
                localStorage.setItem('customLocale', 'en');
            }
        }
    }
}
