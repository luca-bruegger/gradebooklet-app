import { Component } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';
import { ToastDisplayController } from '../../controllers/toast-display.controller';

@Component({
  selector: 'app-extended-security',
  templateUrl: './extended-security.component.html',
  styleUrls: ['./extended-security.component.scss'],
})
export class ExtendedSecurityComponent {
  unlocked = false;
  attemptFailed = false;

  constructor(private faio: FingerprintAIO,
              private navController: NavController,
              private toastDisplayController: ToastDisplayController) {
  }

  ionViewDidEnter() {
    this.presentFingerprintAIO();
  }

  private presentFingerprintAIO() {
    this.faio.show({}).then(() => {
      this.unlocked = true;
      this.attemptFailed = false;
      this.navController.navigateForward('/tabs/subjects', {queryParams: {alreadyAuthenticated: true}});
    }).catch(error => {
      this.toastDisplayController.showErrorToast(error.message);
      this.attemptFailed = true;
    });
  }

  retry() {
    this.presentFingerprintAIO();
  }
}
