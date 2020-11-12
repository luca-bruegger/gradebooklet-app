import {Component} from '@angular/core';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {ModalController, NavController, Platform} from "@ionic/angular";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    unlocked = false;
    constructor(private faio: FingerprintAIO,
                private navCtrl: NavController,
                private plt: Platform,
                private modalController: ModalController) {
    }

    ionViewDidEnter() {
        this.faio.show({}).then(() => {
            this.unlocked = true;
            setTimeout(() =>
                {
                    this.navCtrl.navigateForward(['/tabs'], {animated: false});
                    this.modalController.dismiss();
                },
                600);
        }).catch(error => console.log(error));
    }
}
