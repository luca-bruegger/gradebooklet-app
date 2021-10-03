import { Color } from './color';
import { Subject } from './subject';

export abstract class Gradesystem {
  private readonly color: Color = new Color();

  protected constructor() {
  }

  getColor() {
    return this.color;
  }

  subjectBackgroundColorFromAverage(average: number) {

  }

  abstract calculateAverageGrade(module: Subject);
}
