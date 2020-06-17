import {Component} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Module} from '../models/module';
import {Exam} from '../models/exam';
import {Color} from '../models/color';
import {TranslateService} from '@ngx-translate/core';
import {ExamsController} from '../controller/exams-controller';

@Component({
    selector: 'app-modal-view',
    templateUrl: './modal-view.component.html',
    styleUrls: ['./modal-view.component.scss'],
})
export class ModalViewComponent {
    exam: Exam = new Exam();
    editModule: Module;

    constructor(public modalController: ModalController,
                public alertController: AlertController,
                public translate: TranslateService) {
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
                    cssClass: 'secondary',
                    handler: () => {
                        this.alertController.dismiss();
                    },
                }, {
                    text: this.translate.instant('popup.close'),
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
        await this.validateAndSaveNewExam();
    }

    async saveModule() {
        const editModule = Object.assign(new Module(), this.editModule);
        if (this.everyExamContainsName(editModule)) {
            if (!!editModule.name && !!editModule.teacher && editModule.exams.length !== 0) {
                if (!!this.exam.grade && this.exam.name) {
                    await this.validateAndSaveNewExam().then(() => {
                        this.modalController.dismiss({module: editModule, save: true});
                    });
                } else {
                    await this.saveWithoutNotSavedGrade(editModule);
                }
            } else {
                await this.moduleErrorPopup();
            }
        } else {
            await this.gradesWithoutNamesPopup();
        }
    }

    private async validateAndSaveNewExam() {
        if (/^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/.test(this.exam.grade)) {
            const editModule = Object.assign(new Module(), this.editModule);
            await new ExamsController().prepareGradeForSave(this.exam, editModule);
            this.exam = new Exam();
        } else {
            await this.examErrorPopup();
        }
    }

    private async examErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exam_warning'),
            buttons: [this.translate.instant('popup.fix_error')]
        });

        await alert.present();
    }

    private async moduleErrorPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.module_error'),
            buttons: [this.translate.instant('popup.ok')]
        });
        await alert.present();
    }

    private async gradesWithoutNamesPopup() {
        const alert = await this.alertController.create({
            header: this.translate.instant('popup.warning'),
            message: this.translate.instant('popup.exams_without_names'),
            buttons: [this.translate.instant('popup.ok')]
        });
        await alert.present();
    }

    private saveWithoutNotSavedGrade(editModule: Module) {
        editModule.calculateAverageGrade();
        editModule.color = new Color(editModule.average).color;
        this.modalController.dismiss({module: editModule, save: true});
    }

    private everyExamContainsName(editModule: Module) {
        let every = true;
        editModule.exams.forEach(exam => {
            if (exam.name === '') {
                every = false;
            }
        });
        return every;
    }

    deleteModule() {
        this.modalController.dismiss({delete: true});
    }

    removeExam(exam: Exam) {
        this.editModule.exams.splice(this.editModule.exams.indexOf(exam), 1);
    }
}
