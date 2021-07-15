import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private navController: NavController) {
    this.setupAuthStateListener();
  }

  async registerUserWithEmail(email: string, password: string) {
    return await this.fireAuth.createUserWithEmailAndPassword(email, password).then(async userCredential => {
      const user = userCredential.user;
      await user.sendEmailVerification();
      await this.navController.navigateForward('/tabs');
    }).catch(err => {
      console.error(err);
    });
  }

  async signUserInWithEmail(email: string, password: string) {
    return await this.fireAuth.signInWithEmailAndPassword(email, password).then(async userCredential => {
      const user = userCredential.user;
      await user.sendEmailVerification();
    }).catch(err => {
      console.error(err);
    });
  }

  signOut() {
    this.fireAuth.signOut().then(() => this.navController.navigateBack('/login'));
  }

  get user() {
    return this.fireAuth.user;
  }

  private setupAuthStateListener() {
    this.fireAuth.onAuthStateChanged(state => {
      console.log('Current auth state: ', state);
    });
  }
}
