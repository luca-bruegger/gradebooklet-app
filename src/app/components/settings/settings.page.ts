import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {AboutComponent} from '../about/about.component';
import {AppearanceService} from "../../services/appearance.service";
import {BackupPopoverComponent} from "./backup-popover/backup-popover.component";


@Component({
    selector: 'app-settings-tab',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage {
    darkmodeToggled: boolean = false;
    languages: string[] = ['de', 'en', 'it', 'fr'];
    customLocale = this.translate.instant('languages.' + localStorage.getItem('customLocale'));

    constructor(private translate: TranslateService,
                private modalController: ModalController,
                private appearanceService: AppearanceService,
                private popoverController: PopoverController) {
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
            localStorage.setItem('darkmodeEnabled', 'true')
        } else {
            localStorage.removeItem('darkmodeEnabled')
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

    async openExportPopover() {
        const popover = await this.popoverController.create({
            component: BackupPopoverComponent
        });
        return await popover.present();
    }
}

