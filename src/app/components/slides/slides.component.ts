import { Component, Injectable } from '@angular/core';
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
    speed: 600,
    autoplay: true
  };

  public async present() {
    const modal = await this.modalController.create({
      component: SlidesComponent,
      backdropDismiss: false,
      showBackdrop: true
    });
    return modal.present();
  }

  async closeSlides() {
    await this.modalController.dismiss().then(() => this.storage.set('firstLaunch', JSON.stringify(false)));
  }
}
