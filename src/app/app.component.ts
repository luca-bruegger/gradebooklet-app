import { Component, OnDestroy } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppearanceService } from './services/appearance.service';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@capacitor/splash-screen';
import { LocalStorageService } from './services/local-storage.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  languages: string[] = ['de', 'en', 'it', 'fr'];
  private resumeSubscription: Subscription;

  constructor(private storage: Storage,
              private platform: Platform,
              private faio: FingerprintAIO,
              private translate: TranslateService,
              private appearanceService: AppearanceService,
              private localStorageService: LocalStorageService,
              private navController: NavController) {
    this.checkForCustomLocale();
    this.initializeApp();
  }

  ngOnDestroy() {
    this.resumeSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.checkForExtendedSecurity();
      this.setupAppStateListener();
      this.setAppearance();
      await SplashScreen.hide();
    });
  }

  private setAppearance() {
    if (this.appearanceService.isDarkModeEnabled) {
      this.appearanceService.enableDarkMode();
    }
  }

  private checkForCustomLocale() {
    const customLocale = this.localStorageService.getCustomLocaleValue();
    this.translate.setDefaultLang(customLocale);
    this.setCurrentLanguage();
  }

  private setCurrentLanguage() {
    if (this.isDeviceLanguageAvailable()) {
      const browserLang = this.translate.getBrowserLang();
      this.translate.setDefaultLang(browserLang);
      this.localStorageService.setCustomLocaleValue(browserLang.substr(0, 2));
    }
  }

  private isDeviceLanguageAvailable() {
    const browserLangAbbreviation = this.translate.getBrowserLang().substr(0, 2);
    return this.languages.includes(browserLangAbbreviation);
  }

  private async checkForExtendedSecurity() {
    if (this.platform.is('cordova')) {
      await this.faio.isAvailable().then(() => this.localStorageService.setExtendedSecurityAvailableValue(true));
    } else {
      this.localStorageService.setExtendedSecurityAvailableValue(false);
    }
  }

  private setupAppStateListener() {
    this.resumeSubscription = this.platform.resume.subscribe(() => {
      if (this.platform.is('cordova') &&
        this.localStorageService.isExtendedSecurityAvailable() &&
        this.localStorageService.isExtendedSecurityEnabled()) {
        this.navController.navigateRoot('/account/extended-security');
      }
    });
  }
}
