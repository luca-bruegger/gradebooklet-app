import { Gradesystem, GradesystemType } from '../models/gradesystem';
import { Module } from '../models/module';

export class SwissAdvancedGradesystem extends Gradesystem {
  module: Module;

  constructor(m: Module) {
    super(GradesystemType.SwissAdvancedGradesystem);
    this.module = m;
  }

  calculateAverageGrade(): void {
    let sum = 0;
    let weights = 0;
    let average = 0;

    if (this.module.exams.length === 1) {
      average = Number(this.module.exams[0].grade);
    } else {
      if (!!this.module.exams) {
        this.module.exams.forEach(exam => {
          sum += Number(exam.grade) * (exam.gradeWeight * 100);
          weights += exam.gradeWeight * 100;
        });
        average = sum / weights;
      }
    }
    this.module.average = Number(average.toFixed(2));
    this.setBackgroundColor();
    if (this.module.exams.length === 0) {
      this.module.average = 0;
      this.module.backgroundColor = '';
    }
  }

  private setBackgroundColor() {
    this.module.backgroundColor = super.swissBackgroundColors(this.module.average);
  }
}
