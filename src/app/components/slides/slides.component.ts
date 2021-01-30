import { Component, Injectable, isDevMode, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class SlidesComponent {

  constructor(private modalController: ModalController,
              private storage: Storage) {
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  public present() {
    this.storage.get('firstLaunch').then(async val => {
      if (val === null && !isDevMode()) {
        const modal = await this.modalController.create({
          component: SlidesComponent,
          backdropDismiss: false,
          showBackdrop: true
        });
        return modal.present();
      }
    });
  }

  async closeSlides() {
    await this.modalController.dismiss().then(() => this.storage.set('firstLaunch', JSON.stringify(false)));
  }
}
