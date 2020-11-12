import { Injectable } from '@angular/core';
import {Plugins, StatusBarStyle} from '@capacitor/core';
const { StatusBar } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {

  constructor() { }

  light() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
    document.body.classList.toggle('dark', false);
    StatusBar.setStyle({style: StatusBarStyle.Light});
  }

  dark() {
    localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
    document.body.classList.toggle('dark', true);
    StatusBar.setStyle({style: StatusBarStyle.Dark});
  }
}
