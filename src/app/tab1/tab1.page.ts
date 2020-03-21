import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalViewComponent} from '../modal-view/modal-view.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor(public modalController: ModalController) {
    }

    modules: { name: string, average: number, teacher: string, location: string, grades: number[] }[] = [
        {name: 'Math', average: 5.0, teacher: 'Herr Flückiger', location: 'IET303', grades: [5, 6, 5]},
        {name: 'French', average: 5.5, teacher: 'Herr Ran', location: 'IET106', grades: [5, 6, 5]},
        {name: 'Italian', average: 4.2, teacher: 'Herr Abplanalp', location: 'IET201', grades: [5, 6, 5]},
        {name: 'Sport', average: 5.9, teacher: 'Frau Waber', location: 'Turnhalle Bern/Wankdorf', grades: [5, 6, 5]}];


    async openModal(module) {
        const modal = await this.modalController.create({
            component: ModalViewComponent,
            componentProps: {
                editModule: module,

            }
        });
        return await modal.present();
    }
}
