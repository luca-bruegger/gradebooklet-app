import { Component } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private appearanceService: AppearanceService,
              private firebaseAuth: AngularFireAuth,
              private authService: AuthService,
              private modalController: ModalController) {
    this.isDark = appearanceService.isDarkModeEnabled;

  }

  signInStarted: boolean;
  isDark: boolean;

  async closeModal() {
    await this.modalController.dismiss();
  }

  signIn() {

  }
}
