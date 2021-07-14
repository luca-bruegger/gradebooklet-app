import { Component, OnInit } from '@angular/core';
import { AppearanceService } from '../../../services/appearance.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(private appearanceService: AppearanceService,
              private firebaseAuth: AngularFireAuth,
              private authService: AuthService,
              private modalController: ModalController,
              private navController: NavController) {
    this.isDark = appearanceService.isDarkModeEnabled;

  }

  signInStarted: boolean;
  isDark: boolean;

  async closeModal() {
    await this.modalController.dismiss();
  }

  navigateBackToLogin() {
    this.navController.back();
  }
}
