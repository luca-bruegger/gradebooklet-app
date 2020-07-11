import {Component} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Module} from '../models/module';
import {Exam} from '../models/exam';
import {Color} from '../models/color';
import {TranslateService} from '@ngx-translate/core';
import {ExamsController} from '../controller/exams-controller';
import {PopupController} from '../controller/popup-controller';

@Component({
    selector: 'app-edit-module',
    templateUrl: './edit-module.component.html',
    styleUrls: ['./edit-module.component.scss'],
})
export class EditModuleComponent {
    exam: Exam = new Exam();
    editModule: Module;
    today: string = new Date().toISOString();
    popupController: PopupController;


    constructor(public modalController: ModalController,
                public alertController: AlertController,
                public translate: TranslateService) {
        this.popupController = new PopupController(this.alertController, this.translate, this.modalController);
    }


    closeModal() {
        this.popupController.notSavedPopup();
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
                await this.popupController.moduleErrorPopup();
            }
        } else {
            await this.popupController.gradesWithoutNamesPopup();
        }
    }


    private async validateAndSaveNewExam() {
        if (/^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/.test(this.exam.grade)) {
            const editModule = Object.assign(new Module(), this.editModule);
            await new ExamsController().prepareGradeForSave(this.exam, editModule);
            this.exam = new Exam();
        } else {
            await this.popupController.gradeErrorPopup();
        }
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
