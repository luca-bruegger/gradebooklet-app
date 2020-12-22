import { AfterContentChecked, Component, isDevMode } from '@angular/core';
import {AlertController, ModalController, NavController, Platform} from '@ionic/angular';
import {Module} from '../../models/module';
import {Storage} from '@ionic/storage';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {PdfController} from '../../controllers/pdf-controller';
import {ModulesController} from '../../controllers/modules-controller';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {SlidesComponent} from '../slides/slides.component';
import {ModuleViewComponent} from '../module-view/module-view.component';

@Component({
    selector: 'app-modules-tab',
    templateUrl: 'subjects.page.html',
    styleUrls: ['subjects.page.scss']
})
export class SubjectsPage implements AfterContentChecked {
    color: string;
    modulesController: ModulesController;
    modules: Module[] = [];

    constructor(private modalController: ModalController,
                private storage: Storage,
                private translate: TranslateService,
                private datePipe: DatePipe,
                private plt: Platform,
                private fileOpener: FileOpener,
                private file: File,
                private faio: FingerprintAIO,
                private platform: Platform,
                private navCtrl: NavController,
                private alertController: AlertController,
                private pdfController: PdfController) {
        this.modulesController = new ModulesController(this.storage);
        this.platform.resume.subscribe(() => {
            this.navCtrl.navigateForward([''], {animated: false});
        });

        this.storage.get('firstLaunch').then(async val => {
            if (val === null && !isDevMode()) {
                await this.storage.set('firstLaunch', JSON.stringify(false));
                const modal = await this.modalController.create({
                    component: SlidesComponent,
                    backdropDismiss: false
                });
                return modal.present();
            }
        });

        this.modulesController.loadModulesFromDatabase().then(modules => {
            this.modules = modules;
        });
    }

    ngAfterContentChecked() {
        JSON.parse(localStorage.getItem('darkmodeEnabled')) ? this.color = 'white' : this.color = 'black';
    }

    async openEditModal(m) {
        const clonedModule: Module = _.cloneDeep(m);
        await this.openModal(clonedModule, true, m);
    }

    async openAddModal() {
        await this.openModal(new Module(), false);
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

    async exportModulesAsPDF() {
        if (this.modules.length > 0){
            this.pdfController.createPdf(this.modules);
        } else {
            await this.displayNoModulesPopup();
        }
    }

    createRoomTextForModule(m: Module) {
        if (!!m.room && !!m.building) {
            return m.room + '  ' + m.building;
        }
        if (!!m.room) {
            return m.room;
        }
        if (!!m.building) {
            return m.building;
        }
        return '';
    }

    private async displayNoModulesPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exams-pdf-warning'),
            buttons: [this.translate.instant('popup.accept')]
        });
        await alert.present();
    }
}
