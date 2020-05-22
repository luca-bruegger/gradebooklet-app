import {Component} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalViewComponent} from '../modal-view/modal-view.component';
import {AddModuleModalComponent} from '../add-module-modal/add-module-modal.component';

@Component({
    selector: 'app-modules-tab',
    templateUrl: 'modules.page.html',
    styleUrls: ['modules.page.scss']
})
export class ModulesPage {

    constructor(public modalController: ModalController) {
    }

    module: { name: string, average: number, teacher: string, location: string, grades: number[] };
    modules: { name: string, average: number, teacher: string, location: string, grades: number[] }[] = [];

    async openModal(module) {
        const modal = await this.modalController.create({
            component: ModalViewComponent,
            componentProps: {
                editModule: module,

            }
        });
        return await modal.present();
    }

    async openAddModal() {
        const createModule = {name: '', average: undefined, teacher: '', location: '', grades: []};
        const modal = await this.modalController.create({
            component: AddModuleModalComponent,
            backdropDismiss: false,
            componentProps: {
                editModule: createModule,

            }
        });

        return await modal.present();
    }
}
