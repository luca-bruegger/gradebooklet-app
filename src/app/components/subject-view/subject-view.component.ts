import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../../models/subject';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertDisplayController } from '../../controllers/alert-display.controller';
import { ExamComponent } from '../exam/exam.component';


@Component({
  selector: 'app-module',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss'],
})
export class SubjectViewComponent implements OnInit {
  @Input() readonly isEdit: boolean;
  @Input() readonly subject: Subject;

  @ViewChild(ExamComponent, {static: false}) examComponent;

  subjectCopy = new Subject();

  constructor(private alertController: AlertController,
              private translateService: TranslateService,
              private modalController: ModalController,
              private alertDisplayController: AlertDisplayController) {
  }

  ngOnInit() {
    this.subjectCopy = this.clone(this.subject);
  }

  async closeModal() {
    this.isCurrentSubjectUnchanged() ? await this.modalController.dismiss() : await this.alertDisplayController.notSavedPopup();
  }

  async saveSubject() {
    if (!!this.subjectCopy.name) {
      this.examComponent.areExamsValid() ?  await this.modalController.dismiss({
        editModule: this.subjectCopy,
        save: true
      }) : await this.examsNotValidPopup();
    } else {
      await this.noNameEnteredPopup();
    }
  }

  resetExams() {
    this.examComponent.setSelectedSegmentGrade();
    this.subjectCopy.exams = [];
  }

  async promptUser() {
    if (this.subjectCopy.exams.length > 0) {
      await this.alertDisplayController.gradeErrorPopup(this.translateService.instant('popup.warning-grades-deletion'));
    }
  }

  async deleteModule() {
    await this.modalController.dismiss({
      delete: true
    });
  }

  private isCurrentSubjectUnchanged() {
    return JSON.stringify(this.subject) === JSON.stringify(this.subjectCopy);
  }

  private async noNameEnteredPopup() {
    await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
      this.translateService.instant('popup.module-no-name'),
      this.translateService.instant('popup.accept'));
  }

  private async examsNotValidPopup() {
    await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
      this.translateService.instant('popup.adjust-exams'),
      this.translateService.instant('popup.accept'));
  }

  private clone(subject: Subject) {
    return JSON.parse(JSON.stringify(subject));
  }
}
