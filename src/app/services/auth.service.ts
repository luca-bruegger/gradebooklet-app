import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { ToastDisplayController } from '../controllers/toast-display.controller';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth,
              private navController: NavController,
              private toastDisplayController: ToastDisplayController) {
    this.fireAuth.useDeviceLanguage();
  }

  registerUserWithEmail(email: string, password: string, displayName: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(async userCredential => {
      const user = userCredential.user;
      await user.updateProfile({displayName});
      await user.sendEmailVerification({
        url: 'https://grblt.page.link/welcome/?d=1&email=' + user.email,
        iOS: {
          bundleId: 'ch.lucabruegger.gradebooklet-app'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'grblt.page.link'
      });
    });
  }

  signUserInWithEmail(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.fireAuth.signOut();
  }

  get user() {
    return this.fireAuth.user;
  }

  async resetUserPassword(email: string) {
    await this.fireAuth.sendPasswordResetEmail(email).catch(error => {
      this.toastDisplayController.showErrorToast(error, 10000);
    });
  }
}
