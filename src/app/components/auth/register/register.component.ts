import { Component, OnInit } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { AuthService } from '../../../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isPasswordVisible = false;

  constructor(private appearanceService: AppearanceService,
              private authService: AuthService,
              private navController: NavController) {
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
    this.navController.back();
  }

  private passwordMatch(fieldControl: FormControl) {
    return fieldControl.value === this.registerFormGroup.get('password').value ? null : {
      match: true
    };
  }

  ngOnInit(): void {
    this.registerFormGroup.addControl('passwordConfirmation', new FormControl( '',
      [Validators.compose([Validators.required, this.passwordMatch.bind(this)])]));
  }

  changeMode() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  formValid() {
    return this.registerFormGroup.valid;
  }

  async registerUser() {
    await this.authService.registerUserWithEmail(this.registerFormGroup.get('email').value,
                                           this.registerFormGroup.get('password').value);
  }
}
