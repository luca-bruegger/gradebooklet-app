import { Injectable } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const {StatusBar} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  constructor(private plt: Platform) {

  }

  light() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
    document.body.classList.toggle('dark', false);
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: StatusBarStyle.Light});
    }
  }

  dark() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
    document.body.classList.toggle('dark', true);
    if (this.plt.is('cordova')) {
      StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
  }
}
