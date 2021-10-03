import { Exam } from './exam';
import { Color } from './color';

export class Subject {
  name: string;
  teacher: string;
  room: string;
  building: string;
  exams: Exam[] = [];
  average: number;
  backgroundColor: string;
  passingPercentage = 60;

  calculateAverageGrade() {

    let average = 0;

    if (this.exams.length === 0) {
      this.average = 0;
      this.backgroundColor = '';
    } else {
      if (this.exams.length === 1) {
        average = Number(this.exams[0].grade);
      } else {
        average = this.calculateAverageFromMultipleExams();
      }
      this.average = Number(average.toFixed(2));
      console.log(average)
      this.backgroundColor = this.backgroundColorFromAverage(average);
    }
  }

  private calculateAverageFromMultipleExams() {
    let sum = 0;
    let weights = 0;

    this.exams.forEach(exam => {
      sum += Number(exam.grade) * (exam.gradeWeight * 100);
      weights += exam.gradeWeight * 100;
    });

    return sum / weights;
  }

  private backgroundColorFromAverage(average: number) {
    if (average >= 5.5) {
      return Color.VERY_GOOD;
    }
    if (average >= 5) {
      return Color.GOOD;
    }
    if (average >= 4.5) {
      return Color.OK;
    }
    if (average >= 4) {
      return Color.BAD;
    } else {
      return Color.VERY_BAD;
    }
  }
}


