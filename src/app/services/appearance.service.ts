import { Injectable } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const {StatusBar} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  constructor(private plt: Platform) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (!AppearanceService.isForceDarkmodeActivted()){
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

  private static isForceDarkmodeActivted() {
    return localStorage.getItem('darkmodeEnabled') === 'true';
  }

  disableDarkMode() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
    document.body.classList.toggle('dark', AppearanceService.isSystemDarkmodeEnabled());
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: AppearanceService.isSystemDarkmodeEnabled() ? StatusBarStyle.Dark : StatusBarStyle.Light});
    }
  }

  enableDarkMode() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
    this.setDark();
  }

  private setDark() {
    document.body.classList.toggle('dark', true);
    if (this.plt.is('cordova') && this.isDarkModeEnabled) {
      StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
  }

  private setLight() {
    document.body.classList.toggle('dark', false);
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: StatusBarStyle.Light});
    }
  }

  get isDarkModeEnabled(): boolean {
    return AppearanceService.isSystemDarkmodeEnabled() || AppearanceService.isForceDarkmodeActivted();
  }
}
