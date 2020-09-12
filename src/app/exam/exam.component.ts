import {Component, Input, OnInit} from '@angular/core';
import {GradesystemType} from "../models/gradesystem";
import {Exam, ExamGradeType} from "../models/exam";
import {ExamsController} from "../controllers/exams-controller";
import {PopupController} from "../controllers/popup-controller";
import {Storage} from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
    @Input() moduleGradeType: GradesystemType;
    @Input() moduleExams: Exam[];
    @Input() popupController: PopupController;

    selectedExamGradeType: ExamGradeType = ExamGradeType.grade;
    gradesystem = GradesystemType;
    exam = new Exam();
    examGradeType = ExamGradeType;
    examsController = new ExamsController();
    today: string = new Date().toISOString();
    isFirstTimeExamRemovalForUser: boolean;

    constructor(private storage: Storage,
                private translateService: TranslateService) {
        this.loadIsFirstExamRemovalForUser().then(() => {});
    }

    ngOnInit() {
        this.examsController.migrateExamGradeWeight(this.moduleExams);
    }

    segmentChanged($event: CustomEvent) {
        this.exam.maxPointsPossible = undefined;
        this.exam.reachedPoints = undefined;
        this.exam.grade = undefined;
        this.selectedExamGradeType = $event.detail.value
    }

    saveExam() {
        this.moduleExams.push(this.exam);
        this.exam = new Exam();
    }

    private async loadIsFirstExamRemovalForUser() {
        const FIRST_TIME_EXAM_REMOVAL = 'firstTimeExamRemovalForUser'
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
            if (this.exam.type == ExamGradeType.points) {
                this.validateAndSaveExamWithPoints()
            } else {
                this.validateAndSaveExamWithGrade()
            }
        } else {
            await this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('module.exam.grade-without-name'), this.translateService.instant('popup.accept'))
        }
    }

    areExamsValid() {
        this.moduleExams.forEach(exam => {
            if (!!exam.name) {
                return true;
            } else {
                this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('module.exam.grade-without-name'), this.translateService.instant('popup.accept'))
                return false;
            }
        })
        return true;
    }

    setSelectedSegmentGrade() {
        this.selectedExamGradeType = ExamGradeType.grade;
    }

    removeExam(exam: Exam) {
        this.moduleExams.splice(this.moduleExams.indexOf(exam), 1);
    }

    private validateAndSaveExamWithPoints() {
        if (this.examsController.arePointsInRange(this.exam.maxPointsPossible)) {
            if (this.examsController.arePointsInRange(this.exam.reachedPoints) && Number(this.exam.reachedPoints) <= Number(this.exam.maxPointsPossible)) {
                this.exam.reachedPoints = this.replaceCommaWithDot(this.exam.reachedPoints)
                this.exam.maxPointsPossible = this.replaceCommaWithDot(this.exam.maxPointsPossible)
                this.exam.grade = this.examsController.calculateGradeFromPoints(this.exam.reachedPoints, this.exam.maxPointsPossible)
                this.saveExam()
            } else {
                this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('module.exam.reached-points-range-error'), this.translateService.instant('popup.accept'))
            }
        } else {
            this.popupController.genericPopup(this.translateService.instant('popup.warning'), this.translateService.instant('module.exam.max-points-range-error'), this.translateService.instant('popup.accept'))
        }
    }

    private validateAndSaveExamWithGrade() {
        if (this.examsController.gradeIsWithinSwissGradeRange(this.exam.grade)) {
            this.exam.grade = this.replaceCommaWithDot(this.exam.grade);
            this.saveExam()
        } else {
            this.popupController.gradeErrorPopup(this.translateService.instant('module.exam.grade-doesnt-match-example'))
        }
    }

    replaceCommaWithDot(inputString: string) {
        return String(inputString).replace(',', '.')
    }
}
