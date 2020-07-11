import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Module} from '../models/module';
import {Exam} from '../models/exam';
import {Color} from '../models/color';
import {TranslateService} from '@ngx-translate/core';
import {ExamsController} from '../controller/exams-controller';
import {Storage} from '@ionic/storage';
import {PopupController} from '../controller/popup-controller';

@Component({
    selector: 'app-add-module',
    templateUrl: './add-module.component.html',
    styleUrls: ['./add-module.component.scss'],
})
export class AddModuleComponent implements OnInit {
    firstTime: boolean;
    newModule: Module;
    exam: Exam;
    today: string = new Date().toISOString();
    EXAM_VALIDATE_REGEX = /^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/;
    popupController: PopupController;


    constructor(public modalController: ModalController,
                public alertController: AlertController,
                public translate: TranslateService,
                public storage: Storage) {
        this.popupController = new PopupController(this.alertController, this.translate, this.modalController);
        this.storage.get('firstTimeExamRemoval').then(data => {
            this.firstTime = data === null || JSON.parse(data) === true;
            if (this.firstTime) {
                this.storage.set('firstTimeExamRemoval', JSON.stringify(false));
            }
        });
    }


    ngOnInit() {
        this.newModule = new Module();
        this.exam = new Exam();
    }


    closeModal() {
        this.popupController.notSavedPopup();
    }


    async newExam() {
        if (this.EXAM_VALIDATE_REGEX.test(this.exam.grade)) {
            this.exam.grade = String(this.exam.grade).replace(',', '.');
            this.newModule.exams.push(this.exam);
            this.exam = new Exam();
        } else {
            await this.popupController.gradeErrorPopup();
        }
    }


    async saveModule() {
        if (!!this.newModule.name && !!this.newModule.teacher && this.newModule.exams.length !== 0) {
            if (!!this.exam.grade && !!this.exam.name) {
                if (this.EXAM_VALIDATE_REGEX.test(this.exam.grade)) {
                    await new ExamsController().prepareGradeForSave(this.exam, this.newModule).then(() => {
                            this.exam = new Exam();
                            this.modalController.dismiss({module: this.newModule, save: true});
                        }
                    );
                } else {
                    await this.popupController.gradeErrorPopup();
                }

            } else {
                await this.saveWithoutNewExam();
            }
        } else {
            await this.popupController.moduleErrorPopup();
        }
    }


    async saveWithoutNewExam() {
        this.newModule.calculateAverageGrade();
        this.newModule.color = new Color(this.newModule.average).color;
        await this.modalController.dismiss({module: this.newModule, save: true});
    }


    removeExam(exam: Exam) {
        this.newModule.exams.splice(this.newModule.exams.indexOf(exam), 1);
    }
}
