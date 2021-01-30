import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AboutComponent } from '../about/about.component';
import { AppearanceService } from '../../services/appearance.service';
import { SubjectService } from '../../services/subject.service';
import { PdfController } from '../../controllers/pdf-controller';


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
              private appearanceService: AppearanceService,
              private subjectService: SubjectService,
              private alertController: AlertController,
              private pdfController: PdfController) {
    const darkmodeString = localStorage.getItem('darkmodeEnabled');

    if (!!darkmodeString) {
      const darkmodeEnabled = JSON.parse(darkmodeString);

      if (darkmodeEnabled) {
        this.appearanceService.enableDarkMode();
        this.darkmodeToggled = true;
      }
    }
  }

  updateDarkMode() {
    if (this.darkmodeToggled) {
      this.appearanceService.enableDarkMode();
      localStorage.setItem('darkmodeEnabled', 'true');
    } else {
      localStorage.removeItem('darkmodeEnabled');
      this.appearanceService.disableDarkMode();
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

  async exportModulesAsPDF() {
    if (this.subjectService.allModules.length > 0) {
      this.pdfController.createPdf(this.subjectService.allModules);
    } else {
      await this.displayNoModulesPopup();
    }
  }

  private async displayNoModulesPopup() {
    const alert = await this.alertController.create({
      header: this.translate.instant('popup.warning'),
      message: this.translate.instant('popup.exams-pdf-warning'),
      buttons: [this.translate.instant('popup.accept')]
    });
    await alert.present();
  }
}

