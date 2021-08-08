import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  constructor(private plt: Platform) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (!AppearanceService.isForceDarkmodeActivated()){
          if (event.matches) {
            this.setDark();
          } else {
            this.setLight();
          }
        }
      });
  }

  private static isSystemDarkmodeEnabled() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private static isForceDarkmodeActivated() {
    return localStorage.getItem('darkmodeEnabled') === 'true';
  }

  disableDarkMode() {
    localStorage.setItem('darkmode  Enabled', JSON.stringify(false));
    document.body.classList.toggle('dark', AppearanceService.isSystemDarkmodeEnabled());
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: AppearanceService.isSystemDarkmodeEnabled() ? Style.Dark : Style.Light});
    }
  }

  enableDarkMode() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
    this.setDark();
  }

  private setDark() {
    document.body.classList.toggle('dark', true);
    if (this.plt.is('cordova') && this.isDarkModeEnabled) {
      StatusBar.setStyle({style: Style.Dark});
    }
  }

  private setLight() {
    document.body.classList.toggle('dark', false);
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: Style.Light});
    }
  }

  get isDarkModeEnabled(): boolean {
    return AppearanceService.isSystemDarkmodeEnabled() || AppearanceService.isForceDarkmodeActivated();
  }
}
