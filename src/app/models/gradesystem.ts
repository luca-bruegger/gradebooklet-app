import { Color } from './color';
import { Module } from './module';

export abstract class Gradesystem {
  private readonly type: GradesystemType;
  private readonly color: Color = new Color();

  protected constructor(type: GradesystemType) {
    this.type = type;
  }

  getColor() {
    return this.color;
  }

  swissBackgroundColors(average: number) {
    if (average >= 5.5) {
      return this.color.VERY_GOOD;
    }
    if (average >= 5) {
      return this.color.GOOD;
    }
    if (average >= 4.5) {
      return this.color.OK;
    }
    if (average >= 4) {
      return this.color.BAD;
    } else {
      return this.color.VERY_BAD;
    }
  }

  germanBackgroundColors(average: number) {
    if (average <= 2) {
      return this.color.VERY_GOOD;
    }
    if (average >= 3) {
      return this.color.GOOD;
    }
    if (average >= 4) {
      return this.color.OK;
    }
    if (average >= 5) {
      return this.color.BAD;
    } else {
      return this.color.VERY_BAD;
    }
  }

  getType() {
    return this.type;
  }

  abstract calculateAverageGrade(module: Module);
}

export enum GradesystemType {
  SwissGradesystem = 'gradesystem.swiss',
  SwissAdvancedGradesystem = 'gradesystem.swiss_advanced',
}
