import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastDisplayController {
  constructor(private toastController: ToastController,
              private translateService: TranslateService) {
  }

  async showSuccessToast(header: string, message: string, duration = 2000) {
    const toast = await this.toastController.create({
      header,
      message,
      color: 'success',
      position: 'top',
      duration
    });
    await toast.present();
  }

  async showToast(header: string, message: string, duration = 2000) {
    const toast = await this.toastController.create({
      header,
      message,
      color: 'medium',
      position: 'top',
      duration
    });
    await toast.present();
  }

  async showErrorToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      header: this.translateService.instant('toast.error-title'),
      message,
      color: 'danger',
      position: 'top',
      duration
    });
    await toast.present();
  }
}
