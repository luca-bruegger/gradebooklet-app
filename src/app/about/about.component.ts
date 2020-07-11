import {Component} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {ModalController} from '@ionic/angular';
import {InAppBrowserOptions} from '@ionic-native/in-app-browser';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

    constructor(public modalController: ModalController,
                public iab: InAppBrowser) {
    }

    closeModal() {
        this.modalController.dismiss({
            dismissed: true
        });
    }



    openPrivacy() {
        const browser = this.iab.create('https://gradebooklet.lucabruegger.ch/privacy-policy.html', '_system');
        browser.show();
    }

    openBugReport() {
        const browser = this.iab.create('https://gradebooklet.lucabruegger.ch/report-bug.html', '_system');
        browser.show();
    }

    openFeatureRequest() {
        const browser = this.iab.create('https://gradebooklet.lucabruegger.ch/request-feature.html', '_system');
        browser.show();
    }
}
