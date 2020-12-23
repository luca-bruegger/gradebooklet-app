export class Exam {
  grade: string;
  name: string;
  date: string = new Date().toISOString();
  type: ExamGradeType = ExamGradeType.points;
  reachedPoints: string;
  maxPointsPossible: string;
  gradeWeight = 1;
}

export enum ExamGradeType {
  points = 'points',
  grade = 'grade'
}
