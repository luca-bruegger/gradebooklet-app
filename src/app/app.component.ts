import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AppearanceService} from "./components/settings/appearance.service";

import {Plugins} from '@capacitor/core';
import {delay} from "rxjs/operators";
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
        if (JSON.parse(localStorage.getItem('darkmodeEnabled')) === false) {
            localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
        }

        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        mql.addEventListener("change", value => {
            console.log(value)
        });

        const darkmode = JSON.parse(localStorage.getItem('darkmodeEnabled'));
        if (darkmode) {
            this.appearanceService.dark();
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
