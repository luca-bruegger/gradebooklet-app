import {Component} from '@angular/core';

import {ModalController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  languages: string[] = ['de', 'en', 'it', 'fr', 'ko', 'zh'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    public storage: Storage,
    public modalController: ModalController,
  ) {
    const customLocale = localStorage.getItem('customLocale');
    if (customLocale !== null) {
      translate.setDefaultLang(customLocale);
    } else {
      if (this.languages.includes(translate.getBrowserLang().substr(0, 2))) {
        translate.setDefaultLang(translate.getBrowserLang());
        localStorage.setItem('customLocale', translate.getBrowserLang().substr(0, 2));
      } else {
        translate.setDefaultLang('en');
        localStorage.setItem('customLocale', 'en');
      }
    }

    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      if (JSON.parse(localStorage.getItem('darkmodeEnabled')) === false) {
        localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
      }

      const darkmode = JSON.parse(localStorage.getItem('darkmodeEnabled'));
      if (darkmode === null) {
        this.setLightmodeEnabled();
      } else {
        if (darkmode) {
          this.setDarkmodeEnabled();
        } else {
          this.setLightmodeEnabled();
        }
      }
      this.splashScreen.hide();
    });
  }

  private setDarkmodeEnabled() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
    this.statusBar.styleLightContent();
    document.body.classList.toggle('dark', true);
  }

  private setLightmodeEnabled() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
    this.statusBar.styleDefault();
    document.body.classList.toggle('dark', false);
  }
}
