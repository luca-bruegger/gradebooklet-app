import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-add-module-modal',
  templateUrl: './add-module-modal.component.html',
  styleUrls: ['./add-module-modal.component.scss'],
})
export class AddModuleModalComponent implements OnInit {
  @Input() newModule: { name: string, average: number, teacher: string, location: string, grades: number[] };

  constructor(public modalController: ModalController,
              public alertController: AlertController) {

  }

  ngOnInit() {}

  closeModal() {
    this.presentAlert();

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'Not Saved',
      message: 'You will lose your Progress if you continue.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Close',
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
