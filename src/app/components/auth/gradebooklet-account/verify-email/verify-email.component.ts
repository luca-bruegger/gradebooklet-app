import { Component } from '@angular/core';
import { AppearanceService } from '../../../../services/appearance.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastDisplayController } from '../../../../controllers/toast-display.controller';
import { first } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['../auth.scss'],
})
export class VerifyEmailComponent {
  private interval: number;

  constructor(private appearanceService: AppearanceService,
              private authService: AuthService,
              private modalController: ModalController,
              private route: ActivatedRoute,
              private toastDisplayController: ToastDisplayController,
              private navController: NavController,
              private translateService: TranslateService) {
    this.isDark = appearanceService.isDarkModeEnabled;
  }

  userAuthState: Subscription;
  isDark: boolean;
  reloadCount = 0;
  user: User;
  countdownValue = 0;

  ionViewDidEnter() {
    this.authService.user.pipe(first()).subscribe(user => {
      if (!user) {
        this.navController.navigateBack('account/login');
        return;
      }

      this.user = user;

      this.interval = setInterval(() => {
        if (this.reloadCount === 10) {
          clearInterval(this.interval);
          this.toastDisplayController.showErrorToast(this.translateService.instant('account.verify-email.takes-longer'), 5000);
          return;
        }
        this.checkIfUserHasVerifiedEmail();
      }, 5000);
    });
  }

  async refresh() {
   this.countdownValue = 30;
   await this.user.reload();
   this.startCountdown();
  }

  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdownValue--;
      if (this.countdownValue === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  private checkIfUserHasVerifiedEmail() {
    if (this.user.emailVerified) {
      this.toastDisplayController.showSuccessToast('Hervorragend!', 'Deine Email wurde bestätigt.');
      clearInterval(this.interval);
      this.navController.navigateForward('/tabs/subjects');
    } else {
      this.user.reload();
      this.reloadCount++;
    }
  }
}
