import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private faio: FingerprintAIO,
              private navController: NavController,
              private platform: Platform,
              private modalController: ModalController,
              private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map(user => {
      const isSignedIn = !!user;
      if (isSignedIn || this.userSkippedAuth(next) || this.isAlreadyAuthenticated(next)) {
        return this.continueWithRoutingChecks(next, user);
      } else {
        return this.redirectToLoginPage();
      }
    }));
  }

  private isMobileDevice() {
    return this.platform.is('cordova');
  }

  private isExtendedSecurityEnabled() {
    return this.localStorageService.isExtendedSecurityEnabled();
  }

  private continueWithRoutingChecks(next: ActivatedRouteSnapshot, user: User) {
    this.checkIfUserHasVerifiedEmail(user);
    this.checkIfMobileDeviceWithExtendedSecurity(next);
    return true;
  }

  private checkIfUserHasVerifiedEmail(user: User) {
    if (this.userEmailNotVerified(user)) {
      this.navController.navigateRoot('/account/verify-email');
      return false;
    }
  }

  private checkIfMobileDeviceWithExtendedSecurity(next: ActivatedRouteSnapshot) {
    if ((this.isMobileDevice() && this.isExtendedSecurityEnabled())) {
      if (this.isAlreadyAuthenticated(next)) {
        return true;
      }

      if (this.localStorageService.isExtendedSecurityAvailable()) {
        this.navController.navigateForward('/account/extended-security');
        return false;
      }
    }
  }

  private userSkippedAuth(next: ActivatedRouteSnapshot) {
    return next.queryParamMap.get('skippedAuth') || false;
  }

  private redirectToLoginPage() {
    this.navController.navigateRoot('/account/login');
    return false;
  }

  private userEmailNotVerified(user: User) {
    return !!user && !user.emailVerified;
  }

  private isAlreadyAuthenticated(next: ActivatedRouteSnapshot) {
    return next.queryParamMap.get('alreadyAuthenticated') || false;
  }
}
