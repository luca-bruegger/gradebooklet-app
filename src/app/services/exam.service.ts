import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private SWISS_GRADE_REGEX = /^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/;
  private SWISS_POINTS_REGEX = /^\d{1,3}(?:[.,]\d)?$/;

  removeCommaAndPointFromGrade(exam: Exam) {
    exam.grade = String(exam.grade).replace(',', '.');
    return exam;
  }

  gradeIsWithinSwissGradeRange(inputGrade) {
    return this.SWISS_GRADE_REGEX.test(inputGrade);
  }

  arePointsInRange(grade: string) {
    return this.SWISS_POINTS_REGEX.test(grade);
  }

  calculateGradeFromPoints(reachedPoints: string, maxPointsPossible: string) {
    return String((5 * (Number(reachedPoints) / Number(maxPointsPossible)) + 1).toFixed(1));
  }
}
