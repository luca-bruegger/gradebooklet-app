import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {Router} from "@angular/router";
import {NavController, Platform} from "@ionic/angular";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    constructor(private faio: FingerprintAIO, private navCtrl: NavController, private plt: Platform) {}

    ionViewDidEnter(){
        if (this.plt.is('cordova')) {
            this.faio.isAvailable().then(() => {
                this.faio.show({}).then(() => {
                    setTimeout(() => this.navCtrl.navigateForward(['/tabs'], {animated: false}), 1500)
                }).catch(error => console.log(error));
            }).catch(() => {
                this.navCtrl.navigateForward(['/tabs'], {animated: false});
            });
        } else {
            this.navCtrl.navigateForward(['/tabs'], {animated: false});
        }
    }
}
