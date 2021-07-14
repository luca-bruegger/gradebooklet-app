import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  registerUserWithEmail(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      console.log(user)
    }).catch(err => {
      console.error(err);
    });
  }
}
