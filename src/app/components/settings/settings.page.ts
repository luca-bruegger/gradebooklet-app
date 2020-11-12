import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ModalController} from '@ionic/angular';
import {AboutComponent} from '../about/about.component';
import {AppearanceService} from "./appearance.service";


@Component({
    selector: 'app-settings-tab',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {
    darkmodeToggled: boolean;
    languages: string[] = ['de', 'en', 'it', 'fr'];
    customLocale = this.translate.instant('languages.' + localStorage.getItem('customLocale'));

    constructor(private translate: TranslateService,
                private modalController: ModalController,
                private appearanceService: AppearanceService) {
        const darkmode = JSON.parse(localStorage.getItem('darkmodeEnabled'));
        if (darkmode === null) {
            this.appearanceService.light();
        } else {
            if (darkmode) {
                this.darkmodeToggled = true;
                this.appearanceService.dark();
            } else {
                this.darkmodeToggled = false;
                this.appearanceService.light();
            }
        }
    }

    updateDarkMode() {
        if (this.darkmodeToggled) {
            this.appearanceService.dark();
        } else {
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

