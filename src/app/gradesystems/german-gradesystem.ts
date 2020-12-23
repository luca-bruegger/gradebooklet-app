import { Module } from '../models/module';
import { Gradesystem, GradesystemType } from '../models/gradesystem';

export class GermanGradesystem extends Gradesystem {
  module: Module;

  constructor(m: Module) {
    super(GradesystemType.GermanGradesystem);
    this.module = m;
  }

  calculateAverageGrade(): void {
    let average = 0;
    if (this.module.exams.length === 1) {
      average = Number(this.module.exams[0].grade);
    } else {
      if (!!this.module.exams) {
        this.module.exams.forEach(exam => {
          average += Number(exam.grade);
        });
        average = average / this.module.exams.length;
      }
    }
    this.module.average = Number(average.toFixed(1));
    this.setBackgroundColor();
    if (this.module.exams.length === 0) {
      this.module.average = 0;
      this.module.backgroundColor = '';
    }
  }

  private setBackgroundColor() {
    this.module.backgroundColor = super.germanBackgroundColors(this.module.average);
  }
}
