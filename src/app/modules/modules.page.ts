import {AfterContentChecked, Component} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {AddModuleComponent} from '../add-module/add-module.component';
import {EditModuleComponent} from '../edit-module/edit-module.component';
import {Module} from '../models/module';
import {Storage} from '@ionic/storage';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {AuthComponent} from '../auth/auth.component';
import {PdfController} from '../controller/pdf-controller';
import {ModulesController} from '../controller/modules-controller';



@Component({
    selector: 'app-modules-tab',
    templateUrl: 'modules.page.html',
    styleUrls: ['modules.page.scss']
})
export class ModulesPage extends AuthComponent implements AfterContentChecked {
    color: string;
    modules: Module[] = [];
    pdfController: PdfController;
    modulesController: ModulesController;


    constructor(public modalController: ModalController,
                public storage: Storage,
                public translate: TranslateService,
                public datePipe: DatePipe,
                private plt: Platform,
                private fileOpener: FileOpener,
                private file: File) {
        super();
        this.pdfController = new PdfController(datePipe, plt, file, fileOpener, translate, this.modules);

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
            component: EditModuleComponent,
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
            component: AddModuleComponent,
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

    async exportModulesAsPDF() {
        this.pdfController.createPdf();
    }
}
