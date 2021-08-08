import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AboutComponent } from '../about/about.component';
import { AppearanceService } from '../../services/appearance.service';
import { SubjectService } from '../../services/subject.service';
import { PdfController } from '../../controllers/pdf.controller';
import { AuthService } from '../../services/auth.service';
import { ToastDisplayController } from '../../controllers/toast-display.controller';
import { LocalStorageService } from '../../services/local-storage.service';
import firebase from 'firebase';
import { first } from 'rxjs/operators';
import User = firebase.User;

@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  languages: string[] = ['de', 'en', 'it', 'fr'];
  customLocale = this.translate.instant('languages.' + localStorage.getItem('customLocale'));

  isDarkmodeActive = this.appearanceService.isDarkModeEnabled;
  isEnhancedSecurityActive: boolean;
  user: User;
  isLoading = false;

  constructor(private translate: TranslateService,
              private modalController: ModalController,
              private appearanceService: AppearanceService,
              private subjectService: SubjectService,
              private alertController: AlertController,
              private pdfController: PdfController,
              private navController: NavController,
              private authService: AuthService,
              private toastDisplayController: ToastDisplayController,
              private localStorageService: LocalStorageService) {
    const darkmodeEnabled = localStorageService.getDarkmodeEnabledValue();
    this.isEnhancedSecurityActive = localStorageService.isExtendedSecurityEnabled();

    if (darkmodeEnabled) {
      this.appearanceService.enableDarkMode();
    }
    this.user = {} as User;
  }

  ngOnInit() {
    this.isLoading = true;
    this.authService.user.pipe(first()).subscribe(userState => {
      this.isLoading = false;
      this.user = userState;
    });
  }

  updateDarkMode() {
    this.isDarkmodeActive ? this.appearanceService.enableDarkMode() : this.appearanceService.disableDarkMode();
  }

  changeLang(ev) {
    const locale = ev.detail.value;
    this.customLocale = this.translate.instant('languages.' + locale);
    this.translate.setDefaultLang(locale);
    this.localStorageService.setCustomLocaleValue(locale);
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

  async logOut() {
    await this.authService.signOut().then(() => this.navController.navigateBack('/account/login')).catch(error => {
      this.toastDisplayController.showErrorToast(error.message);
    });
    await this.toastDisplayController.showSuccessToast(this.translate.instant('account.successfully-signed-out'), this.translate.instant('account.successfully-signed-out-info'));
  }

  updateExtendedSecurity() {
    this.isEnhancedSecurityActive ?
      this.localStorageService.setExtendedSecurityEnabledValue(true) :
      this.localStorageService.setExtendedSecurityEnabledValue(false);
  }

  async logIn() {
    await this.navController.navigateBack('/account/login');
  }

  updateCloudActive() {

  }

  isExtendedSecurityAvailable() {
    return this.localStorageService.isExtendedSecurityAvailable();
  }
}

