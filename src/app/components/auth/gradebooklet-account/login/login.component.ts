import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, NavController } from '@ionic/angular';
import { AppearanceService } from '../../../../services/appearance.service';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastDisplayController } from '../../../../controllers/toast-display.controller';
import Auth from '../auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss'],
})
export class LoginComponent extends Auth {
  forgotPassword = false;

  constructor(private appearanceService: AppearanceService,
              private firebaseAuth: AngularFireAuth,
              private authService: AuthService,
              private modalController: ModalController,
              private navController: NavController,
              private toastDisplayController: ToastDisplayController,
              private translateService: TranslateService) {
    super(appearanceService);
  }

  loginFormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required,
      Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])
  });

  signInStarted: boolean;
  passwordResetStarted: boolean;
  isDark: boolean;

  async closeModal() {
    await this.modalController.dismiss();
  }

  async signIn() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.signInStarted = true;
    await this.authService.signUserInWithEmail(this.loginFormGroup.get('email').value,
      this.loginFormGroup.get('password').value).then(() => {
      this.toastDisplayController.showSuccessToast(this.translateService.instant('account.login.finished'), this.translateService.instant('account.login.success'));
    }).catch(error => {
      this.toastDisplayController.showErrorToast(error.message, 5000);
    });
    this.signInStarted = false;


    await this.navController.navigateForward('/tabs');
  }

  toggleForgotPassword() {
    this.forgotPassword = !this.forgotPassword;
  }

  async resetPassword() {
    if (this.loginFormGroup.get('email').invalid) {
      this.loginFormGroup.get('email').markAsTouched();
      return;
    }

    this.passwordResetStarted = true;
    await this.authService.resetUserPassword(this.loginFormGroup.get('email').value);
    this.passwordResetStarted = false;

    await this.toastDisplayController.showToast(this.translateService.instant('account.success'), this.translateService.instant('account.success.reset-password-link-sent'), 5000);
  }

  async navigateToAuth() {
    await this.navController.navigateRoot('/tabs/auth');
  }

  async skipSignIn() {
    await this.navController.navigateForward('/tabs/subjects', {queryParams: {skippedAuth: true}});
  }
}
