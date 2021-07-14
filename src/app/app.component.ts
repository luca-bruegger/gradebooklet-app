import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppearanceService } from './services/appearance.service';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  languages: string[] = ['de', 'en', 'it', 'fr'];

  constructor(private storage: Storage,
              private platform: Platform,
              private translate: TranslateService,
              private appearanceService: AppearanceService) {
    this.setLocales();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.setAppearance();
      await SplashScreen.hide();
    });
  }

  private setAppearance() {
    if (this.appearanceService.isDarkModeEnabled) {
      this.appearanceService.enableDarkMode();
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
