import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Module } from '../../models/module';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GradesystemType } from '../../models/gradesystem';
import { AlertDisplayController } from '../../controllers/alert-display.controller';
import { ExamComponent } from '../exam/exam.component';

@Component({
  selector: 'app-module',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss'],
})
export class SubjectViewComponent implements OnInit {
  @Input() isEditModule: boolean;
  @Input() editModule: Module;
  @ViewChild(ExamComponent, {static: false}) examComponent;

  gradesystemTypes = Object.values(GradesystemType);
  editModuleBackup = new Module();


  constructor(private alertController: AlertController,
              private translateService: TranslateService,
              private modalController: ModalController,
              private alertDisplayController: AlertDisplayController) {

  }

  ngOnInit() {
    if (this.editModule.gradesystemType === undefined) {
      this.editModule.gradesystemType = GradesystemType.SwissGradesystem;
    }
    Object.assign(this.editModuleBackup, this.editModule);
  }

  async closeModal() {
    JSON.stringify(this.editModule) === JSON.stringify(this.editModuleBackup) ?
      await this.modalController.dismiss() :
      await this.alertDisplayController.notSavedPopup();
  }

  async prepareModuleSave() {
    if (!!this.editModule.name) {
      if (this.examComponent.areExamsValid()) {
        await this.modalController.dismiss({editModule: this.editModule, save: true});
      } else {
        await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
          this.translateService.instant('popup.adjust-exams'),
          this.translateService.instant('popup.accept'));
      }
    } else {
      await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
        this.translateService.instant('popup.module-no-name'),
        this.translateService.instant('popup.accept'));
    }
  }

  resetExams() {
    this.examComponent.setSelectedSegmentGrade();
    this.editModule.exams = [];
  }

  async promptUser() {
    if (this.editModule.exams.length > 0) {
      await this.alertDisplayController.gradeErrorPopup(this.translateService.instant('popup.warning-grades-deletion'));
    }
  }

  async deleteModule() {
    await this.modalController.dismiss({
      delete: true
    });
  }
}
