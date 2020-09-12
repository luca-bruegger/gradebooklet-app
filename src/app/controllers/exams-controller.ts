import { Exam } from '../models/exam';

export class ExamsController {
    private readonly possibleExamWeights = [1, 0.75, 0.66, 0.6, 0.5, 0.4, 0.33, 0.25];

    private SWISS_GRADE_REGEX = /^(?:[0-5](?:[.,][0-9])?|6(?:[.,]0)?)$/;
    private SWISS_POINTS_REGEX = /^\d{1,3}(?:[.,]\d)?$/;

    removeCommaAndPointFromGrade(exam: Exam) {
        exam.grade = String(exam.grade).replace(',', '.');
        return exam;
    }

    gradeIsWithinSwissGradeRange(inputGrade) {
        return this.SWISS_GRADE_REGEX.test(inputGrade)
    }

    arePointsInRange(grade: string) {
        return this.SWISS_POINTS_REGEX.test(grade)
    }

    getPossibleExamWeights() {
        return this.possibleExamWeights;
    }

    calculateGradeFromPoints(reachedPoints: string, maxPointsPossible: string) {
        return String((5 * (Number(reachedPoints) / Number(maxPointsPossible)) + 1).toFixed(1));
    }

    migrateExamGradeWeight(moduleExams: Exam[]) {
        moduleExams.forEach(exam => {
            if (exam.gradeWeight === undefined){
                exam.gradeWeight = 1;
            }
        })
    }
}
