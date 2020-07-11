import {Component} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {ModalController} from '@ionic/angular';
import {AboutComponent} from '../about/about.component';


@Component({
    selector: 'app-settings-tab',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {
    darkmodeToggled: boolean;
    languages: string[] = ['de', 'en', 'it', 'fr'];
    customLocale = this.translate.instant('languages.' + localStorage.getItem('customLocale'));

    constructor(private statusBar: StatusBar,
                public translate: TranslateService,
                public modalController: ModalController) {
        const darkmode = JSON.parse(localStorage.getItem('darkmodeEnabled'));
        if (darkmode === null) {
            this.setLightmodeEnabled();
        } else {
            if (darkmode) {
                this.darkmodeToggled = true;
                this.setDarkmodeEnabled();
            } else {
                this.darkmodeToggled = false;
                this.setLightmodeEnabled();
            }
        }
    }


    updateDarkMode() {
        if (this.darkmodeToggled) {
            this.setDarkmodeEnabled();
        } else {
            this.setLightmodeEnabled();
        }
    }

    private setDarkmodeEnabled() {
        localStorage.setItem('darkmodeEnabled', JSON.stringify(true));
        this.darkmodeToggled = true;
        this.statusBar.styleLightContent();
        document.body.classList.toggle('dark', this.darkmodeToggled);
    }

    private setLightmodeEnabled() {
        localStorage.setItem('darkmodeEnabled', JSON.stringify(false));
        this.darkmodeToggled = false;
        this.statusBar.styleDefault();
        document.body.classList.toggle('dark', this.darkmodeToggled);
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

