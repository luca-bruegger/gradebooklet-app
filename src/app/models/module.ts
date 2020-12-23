import { Exam } from './exam';
import { GradesystemType } from './gradesystem';

export class Module {
  name: string;
  teacher: string;
  room: string;
  building: string;
  exams: Exam[] = [];
  average: number;
  gradesystemType: GradesystemType;
  backgroundColor: string;
  passingPercentage = 60;
}


