import {AfterContentChecked, Component, DoCheck} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddModuleModalComponent} from '../add-module-modal/add-module-modal.component';
import {ModalViewComponent} from '../modal-view/modal-view.component';
import {Module} from '../models/module';
import {Storage} from '@ionic/storage';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-modules-tab',
    templateUrl: 'modules.page.html',
    styleUrls: ['modules.page.scss']
})
export class ModulesPage implements AfterContentChecked {
    color: string;
    modules: Module[] = [];

    constructor(public modalController: ModalController,
                public storage: Storage,
                public translate: TranslateService) {
        storage.get('modules').then(data => {
            if (!!data) {
                this.modules = JSON.parse(data);
            }
        });
    }

    ngAfterContentChecked() {
        JSON.parse(localStorage.getItem('darkmodeEnabled')) ? this.color = 'white' : this.color = 'black';
    }

    async openModal(module) {
        const clonedModule: Module = _.cloneDeep(module);
        const modal = await this.modalController.create({
            component: ModalViewComponent,
            componentProps: {
                editModule: clonedModule
            }
        });

        modal.onWillDismiss().then((data) => {
            if (data.data.delete) {
                this.modules.splice(this.modules.indexOf(module), 1);
            }
            if (data.data.save) {
                this.modules[this.modules.indexOf(module)] = data.data.module;
            }
            this.storage.set('modules', JSON.stringify(this.modules));
        });

        return await modal.present();
    }

    async openAddModal() {
        const modal = await this.modalController.create({
            component: AddModuleModalComponent,
            backdropDismiss: false
        });


        modal.onDidDismiss().then((data) => {
            if (data.data.save) {
                this.modules.push(data.data.module);
            }
            this.storage.set('modules', JSON.stringify(this.modules));
        });

        return modal.present();
    }

    textColorForNameByAverage(module: Module) {
        if (module.average >= 4.5 && module.average < 5) {
            return 'black';
        } else {
            return '';
        }
    }

    textColorForAverage(module: Module) {
        if (module.average >= 5 && module.average < 5.5) {
            return 'black';
        } else {
            return '';
        }
    }
}
