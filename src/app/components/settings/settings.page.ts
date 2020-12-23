import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { AboutComponent } from '../about/about.component';
import { AppearanceService } from '../../services/appearance.service';


@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  darkmodeToggled = false;
  languages: string[] = ['de', 'en', 'it', 'fr'];
  customLocale = this.translate.instant('languages.' + localStorage.getItem('customLocale'));

  constructor(private translate: TranslateService,
              private modalController: ModalController,
              private appearanceService: AppearanceService) {
    const darkmodeString = localStorage.getItem('darkmodeEnabled');

    if (!!darkmodeString) {
      const darkmodeEnabled = JSON.parse(darkmodeString);

      if (darkmodeEnabled) {
        this.appearanceService.dark();
        this.darkmodeToggled = true;
      }
    }
  }

  updateDarkMode() {
    if (this.darkmodeToggled) {
      this.appearanceService.dark();
      localStorage.setItem('darkmodeEnabled', 'true');
    } else {
      localStorage.removeItem('darkmodeEnabled');
      this.appearanceService.light();
    }
  }

  changeLang(ev) {
    this.customLocale = this.translate.instant('languages.' + ev.detail.value);
    this.translate.setDefaultLang(ev.detail.value);
    localStorage.setItem('customLocale', ev.detail.value);
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: AboutComponent
    });

    return modal.present();
  }
}

