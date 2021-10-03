export class Exam {
  grade: string;
  name: string;
  date: string = new Date().toISOString();
  type: ExamGradeType = ExamGradeType.points;
  gradeWeight = 1;

  calculateGradeFromPoints(reachedPoints: string, maxPoints: string) {
    this.grade = String((5 * (Number(reachedPoints) / Number(maxPoints)) + 1).toFixed(1));
  }
}

export enum ExamGradeType {
  points = 'points',
  grade = 'grade'
}
