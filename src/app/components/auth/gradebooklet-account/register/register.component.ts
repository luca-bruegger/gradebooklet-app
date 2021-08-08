import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppearanceService } from '../../../../services/appearance.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastDisplayController } from '../../../../controllers/toast-display.controller';
import Auth from '../auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss'],
})
export class RegisterComponent extends Auth implements OnInit {
  isPasswordVisible = false;

  constructor(private appearanceService: AppearanceService,
              private authService: AuthService,
              private navController: NavController,
              private toastDisplayController: ToastDisplayController,
              private translateService: TranslateService) {
    super(appearanceService);
    this.isDark = appearanceService.isDarkModeEnabled;
  }

  registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,
      Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  });

  isDark: boolean;
  signInStarted = false;

  navigateBackToLogin() {
    this.navController.navigateBack('/account/login');
  }

  private passwordMatch(fieldControl: FormControl) {
    return fieldControl.value === this.registerFormGroup.get('password').value ? null : {
      match: true
    };
  }

  ngOnInit(): void {
    this.registerFormGroup.addControl('passwordConfirmation', new FormControl('',
      [Validators.compose([Validators.required, this.passwordMatch.bind(this)])]));
  }

  changeMode() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  formValid() {
    return this.registerFormGroup.valid;
  }

  async registerUser() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    this.signInStarted = true;
    await this.authService.registerUserWithEmail(this.registerFormGroup.get('email').value,
      this.registerFormGroup.get('password').value,
      this.registerFormGroup.get('displayName').value)
      .then(async () => {
        await this.toastDisplayController.showSuccessToast(this.translateService.instant('account.register.success'),
          this.translateService.instant('account.register.registered'));
        await this.navController.navigateForward('/tabs/subjects');
      })
      .catch(err => {
        this.toastDisplayController.showErrorToast(err.message);
      }).finally(() => this.signInStarted = false);
  }

  resetForm() {
    this.registerFormGroup.reset();

    Object.keys(this.registerFormGroup.controls).forEach(key => {
      this.registerFormGroup.get(key).setErrors(null);
    });
  }
}
