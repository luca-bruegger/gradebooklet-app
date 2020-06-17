import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Module} from '../models/module';
import {Exam} from '../models/exam';
import {Color} from '../models/color';
import {TranslateService} from '@ngx-translate/core';
import {ExamsController} from '../controller/exams-controller';


@Component({
    selector: 'app-add-module-modal',
    templateUrl: './add-module-modal.component.html',
    styleUrls: ['./add-module-modal.component.scss'],
})
export class AddModuleModalComponent implements OnInit {
    newModule: Module;
    exam: Exam;

    constructor(public modalController: ModalController,
                public alertController: AlertController,
                public translate: TranslateService) {

    }

    ngOnInit() {
        this.newModule = new Module();
        this.exam = new Exam();
    }

    closeModal() {
        this.presentAlert();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.not_saved'),
            message: this.translate.instant('popup.not_saved_warning'),
            buttons: [
                {
                    text: this.translate.instant('popup.continue'),
                    handler: () => {
                        this.alertController.dismiss();
                    },
                }, {
                    text: this.translate.instant('popup.close'),
                    cssClass: 'secondary',
                    handler: () => {
                        this.modalController.dismiss({
                            dismissed: true
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async newExam() {
        if (/^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/.test(this.exam.grade)) {
            this.exam.grade = String(this.exam.grade).replace(',', '.');
            this.newModule.exams.push(this.exam);
            this.exam = new Exam();
        } else {
            await this.gradeAlert();
        }
    }

    async gradeAlert() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exam_warning'),
            buttons: [this.translate.instant('popup.fix_error')]
        });

        await alert.present();
    }

    async saveModule() {
        if (!!this.newModule.name && !!this.newModule.teacher && this.newModule.exams.length !== 0) {
            if (!!this.exam.grade && !!this.exam.name) {
                if (/^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/.test(this.exam.grade)) {
                    await new ExamsController().prepareGradeForSave(this.exam, this.newModule).then(() => {
                            this.exam = new Exam();
                            this.modalController.dismiss({module: this.newModule, save: true});
                        }
                    );
                } else {
                    await this.gradeErrorPopup();
                }

            } else {
                await this.examErrorPopup();
            }
        } else {
            await this.moduleErrorPopup();
        }
    }

    async gradeErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exam_warning'),
            buttons: [this.translate.instant('popup.fix_error')]
        });
        await alert.present();
    }

    async examErrorPopup() {
        this.newModule.calculateAverageGrade();
        this.newModule.color = new Color(this.newModule.average).color;
        await this.modalController.dismiss({module: this.newModule, save: true});
    }

    async moduleErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.module_error'),
            buttons: [this.translate.instant('popup.ok')]
        });
        await alert.present();
    }

    removeExam(exam: Exam) {
        this.newModule.exams.splice(this.newModule.exams.indexOf(exam), 1);
    }
}
