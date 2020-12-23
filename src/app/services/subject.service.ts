import { Injectable } from '@angular/core';
import { ModulesController } from '../controllers/modules-controller';
import { Storage } from '@ionic/storage';
import { Module } from '../models/module';
import { ModuleViewComponent } from '../components/module-view/module-view.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private modulesController: ModulesController;
  private modules: Module[] = [];

  constructor(private storage: Storage,
              private modalController: ModalController) {
    this.modulesController = new ModulesController(this.storage);

    this.modulesController.loadModulesFromDatabase().then(modules => {
      this.modules = modules;
    });
  }

  async openModal(editModule: Module, isEditModule: boolean, m?: Module) {
    const modal = await this.modalController.create({
      component: ModuleViewComponent,
      componentProps: {
        editModule,
        isEditModule
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((data) => {
      if (data.data.delete) {
        this.modules.splice(this.modules.indexOf(m), 1);
      }
      if (data.data.save) {
        this.modulesController.getGradesystemObject(data.data.editModule).calculateAverageGrade();
        isEditModule ? this.modules[this.modules.indexOf(m)] = data.data.editModule : this.modules.push(data.data.editModule);
      }

      this.storage.set('modules', JSON.stringify(this.modules));
    });

    return modal.present();
  }

  get allModules() {
    return this.modules;
  }
}
