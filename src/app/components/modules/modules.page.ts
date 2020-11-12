import {AfterContentChecked, Component} from '@angular/core';
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
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {SlidesComponent} from "../slides/slides.component";
import {ModuleViewComponent} from "../module-view/module-view.component";
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-modules-tab',
    templateUrl: 'modules.page.html',
    styleUrls: ['modules.page.scss']
})
export class ModulesPage implements AfterContentChecked {
    color: string;
    pdfController: PdfController;
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
                private modalService: ModalService) {
        this.modulesController = new ModulesController(this.storage);
        this.platform.resume.subscribe(() => {
            this.navCtrl.navigateForward([''], {animated: false});
        });

        this.storage.get('firstLaunch').then(async val => {
            if (val === null) {
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
            this.pdfController = new PdfController(datePipe, plt, file, fileOpener, translate, this.modules);
        })
    }

    ngAfterContentChecked() {
        JSON.parse(localStorage.getItem('darkmodeEnabled')) ? this.color = 'white' : this.color = 'black';
    }

    async openEditModal(m) {
        const clonedModule: Module = _.cloneDeep(m);
        const modal = await this.modalController.create({
            component: ModuleViewComponent,
            componentProps: {
                editModule: clonedModule,
                isEditModule: true
            }
        });

        modal.onWillDismiss().then((data) => {
            if (data.data.delete) {
                this.modules.splice(this.modules.indexOf(m), 1);
            }
            if (data.data.save) {
                this.modulesController.getGradesystemObject(data.data.editModule).calculateAverageGrade()
                this.modules[this.modules.indexOf(m)] = data.data.editModule;
            }
            this.storage.set('modules', JSON.stringify(this.modules));
        });

        modal.onDidDismiss().then(() => {
            this.modalService.deactivate();
        });

        return await modal.present().then(() => {
            this.modalService.setActive(modal);
        });
    }

    async openAddModal() {
        const modal = await this.modalController.create({
            component: ModuleViewComponent,
            componentProps: {
                editModule: new Module(),
                isEditModule: false
            },
            backdropDismiss: false
        });


        modal.onDidDismiss().then((data) => {
            if (data.data.save) {
                this.modulesController.getGradesystemObject(data.data.editModule).calculateAverageGrade()
                this.modules.push(data.data.editModule);
            }

            this.storage.set('modules', JSON.stringify(this.modules));
        });

        modal.onDidDismiss().then(() => {
            this.modalService.deactivate();
        });

        return modal.present().then(() => {
            this.modalService.setActive(modal);
        });
    }

    async exportModulesAsPDF() {
        if (this.modules.length > 0){
            this.pdfController.createPdf();
        } else {
            await this.displayNoModulesPopup();
        }
    }

    createRoomTextForModule(m: Module) {
        if (!!m.room && !!m.building) {
            return m.room + "  " + m.building;
        }
        if (!!m.room) {
            return m.room;
        }
        if (!!m.building) {
            return m.building;
        }
        return "";
    }

    private async displayNoModulesPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exams-pdf-warning'),
            buttons: [this.translate.instant('popup.accept')]
        })
        await alert.present();
    }
}
