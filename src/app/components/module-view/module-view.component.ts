import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Module} from "../../models/module";
import {PopupController} from "../../controllers/popup-controller";
import {AlertController, ModalController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {ExamComponent} from "../../exam/exam.component";
import {GradesystemType} from "../../models/gradesystem";

@Component({
    selector: 'app-module',
    templateUrl: './module-view.component.html',
    styleUrls: ['./module-view.component.scss'],
})
export class ModuleViewComponent implements OnInit {
    @Input() isEditModule: boolean;
    @Input() editModule: Module;
    @ViewChild(ExamComponent, {static: false}) examComponent;

    popupController: PopupController;
    gradesystemTypes = Object.values(GradesystemType);
    editModuleBackup = new Module();


    constructor(private alertController: AlertController,
                private translateService: TranslateService,
                private modalController: ModalController) {
        this.popupController = new PopupController(this.alertController, this.translateService, this.modalController);

    }

    ngOnInit() {
        if (this.editModule.gradesystemType == undefined) {
            this.editModule.gradesystemType = GradesystemType.SwissGradesystem;
        }
        Object.assign(this.editModuleBackup, this.editModule);
    }

    async closeModal() {
        JSON.stringify(this.editModule) == JSON.stringify(this.editModuleBackup) ? await this.modalController.dismiss() : await this.popupController.notSavedPopup()
    }

    async prepareModuleSave() {
        if (!!this.editModule.name) {
            if (this.examComponent.areExamsValid()) {
                await this.modalController.dismiss({editModule: this.editModule, save: true});
            } else {
                await this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('popup.adjust-exams'), this.translateService.instant('popup.accept'))
            }
        } else {
            await this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('popup.module-no-name'), this.translateService.instant('popup.accept'))
        }
    }

    resetExams() {
        this.examComponent.setSelectedSegmentGrade()
        this.editModule.exams = []
    }

    promptUser() {
        if (this.editModule.exams.length > 0) {
            this.popupController.gradeErrorPopup(this.translateService.instant('popup.warning-grades-deletion'))
        }
    }

    deleteModule() {

        this.modalController.dismiss({
            delete: true
        })
    }
}
