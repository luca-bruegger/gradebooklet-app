import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

export class PopupController {
    constructor(public alertController: AlertController,
                public translate: TranslateService,
                public modalController: ModalController) {
    }

    async gradeErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exam_warning'),
            buttons: [this.translate.instant('popup.fix_error')]
        });
        await alert.present();
    }

    async moduleErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.module_error'),
            buttons: [this.translate.instant('popup.ok')]
        });
        await alert.present();
    }

    async gradesWithoutNamesPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exams_without_names'),
            buttons: [this.translate.instant('popup.ok')]
        });
        await alert.present();
    }

    async notSavedPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.not_saved'),
            message: this.translate.instant('popup.not_saved_warning'),
            buttons: [
                {
                    text: this.translate.instant('popup.continue'),
                    handler: () => {
                        this.alertController.dismiss();
                    },
                }, {
                    text: this.translate.instant('popup.close'),
                    cssClass: 'secondary',
                    handler: () => {
                        this.modalController.dismiss({
                            dismissed: true
                        });
                    }
                }
            ]
        });
        await alert.present();
    }
}
