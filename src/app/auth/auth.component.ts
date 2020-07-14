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
            this.faio.isAvailable().then(isAvailable => {
                if (isAvailable) {
                    this.faio.show({}).then(() => {
                        this.navCtrl.navigateForward(['/tabs'], {animated: false});
                    }).catch(error => console.log(error));
                }
            });
        } else {
            this.navCtrl.navigateForward(['/tabs'], {animated: false});
        }
    }
}
