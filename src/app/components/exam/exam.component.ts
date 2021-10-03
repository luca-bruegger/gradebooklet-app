import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Exam, ExamGradeType } from '../../models/exam';
import { AlertDisplayController } from '../../controllers/alert-display.controller';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  @Input() moduleExams: Exam[];

  selectedExamGradeType: ExamGradeType = ExamGradeType.grade;
  exam = new Exam();
  today: string = new Date().toISOString();
  isFirstTimeExamRemovalForUser: boolean;
  reachedPoints: string;
  maxPoints: string;

  constructor(private storage: Storage,
              private translateService: TranslateService,
              private alertDisplayController: AlertDisplayController,
              private examService: ExamService) {
    this.loadIsFirstExamRemovalForUser();
  }

  segmentChanged($event: CustomEvent) {
    const value = $event.detail.value;

    if (value === '') {
      return;
    }

    this.maxPoints = undefined;
    this.reachedPoints = undefined;
    this.exam.grade = undefined;
    this.selectedExamGradeType = value;
  }

  saveExam() {
    this.moduleExams.push(this.exam);
    this.exam = new Exam();
  }

  private async loadIsFirstExamRemovalForUser() {
    const FIRST_TIME_EXAM_REMOVAL = 'firstTimeExamRemovalForUser';
    await this.storage.get(FIRST_TIME_EXAM_REMOVAL).then(data => {
      this.isFirstTimeExamRemovalForUser = data === null || JSON.parse(data) === true;
      if (this.isFirstTimeExamRemovalForUser) {
        this.storage.set(FIRST_TIME_EXAM_REMOVAL, JSON.stringify(false));
      }
    });
  }

  async newExam() {
    this.exam.type = this.selectedExamGradeType;
    if (!!this.exam.name) {
      if (this.exam.type === ExamGradeType.points) {
        this.validateAndSaveExamWithPoints();
      } else {
        this.validateAndSaveExamWithGrade();
      }
    } else {
      await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
        this.translateService.instant('module.exam.grade-without-name'),
        this.translateService.instant('popup.accept'));
    }
  }

  areExamsValid() {
    this.moduleExams.forEach(async exam => {
      if (!!exam.name) {
        return true;
      } else {
        await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
          this.translateService.instant('module.exam.grade-without-name'),
          this.translateService.instant('popup.accept'));
        return false;
      }
    });
    return true;
  }

  setSelectedSegmentGrade() {
    this.selectedExamGradeType = ExamGradeType.grade;
  }

  removeExam(exam: Exam) {
    this.moduleExams.splice(this.moduleExams.indexOf(exam), 1);
  }

  private async validateAndSaveExamWithPoints() {
    if (this.examService.arePointsInRange(this.maxPoints)) {
      if (this.examService.arePointsInRange(this.reachedPoints) && Number(this.reachedPoints) <= Number(this.maxPoints)) {
        this.reachedPoints = this.replaceCommaWithDot(this.reachedPoints);
        this.maxPoints = this.replaceCommaWithDot(this.maxPoints);
        (this.exam as Exam).calculateGradeFromPoints(this.reachedPoints, this.maxPoints);
        this.saveExam();
      } else {
        await this.showReachedPointsNotInRangePopup();
      }
    } else {
      await this.showMaxPointsNotInRangePopup();
    }
  }

  private async validateAndSaveExamWithGrade() {
    if (this.examService.gradeIsWithinSwissGradeRange(this.exam.grade)) {
      this.exam.grade = this.replaceCommaWithDot(this.exam.grade);
      this.saveExam();
    } else {
      await this.alertDisplayController.gradeErrorPopup(this.translateService.instant('module.exam.grade-doesnt-match-example'));
    }
  }

  replaceCommaWithDot(inputString: string) {
    return String(inputString).replace(',', '.');
  }

  private async showMaxPointsNotInRangePopup() {
    await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
      this.translateService.instant('module.exam.max-points-range-error'),
      this.translateService.instant('popup.accept'));
  }

  private async showReachedPointsNotInRangePopup() {
    await this.alertDisplayController.genericPopup(this.translateService.instant('popup.warning'),
      this.translateService.instant('module.exam.reached-points-range-error'),
      this.translateService.instant('popup.accept'));
  }
}
