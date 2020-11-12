import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {ModalController, NavController, Platform} from "@ionic/angular";
import {AuthComponent} from "./auth.component";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private faio: FingerprintAIO,
                private navCtrl: NavController,
                private plt: Platform,
                private router: Router,
                private modalController: ModalController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.plt.is('cordova')) {
            this.faio.isAvailable().then(async () => {
                const modal = await this.modalController.create({
                    component: AuthComponent
                });
                return await modal.present();
            }).catch(() => {
                this.redirectToModules();
                return false;
            });
        } else {
            this.redirectToModules();
            return false;
        }
    }

    private redirectToModules() {
        this.router.navigateByUrl('/tabs/modules', {replaceUrl: true});
    }
}
