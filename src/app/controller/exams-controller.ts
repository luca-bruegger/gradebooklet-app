import {Exam} from '../models/exam';
import {Module} from '../models/module';
import {Color} from '../models/color';

export class ExamsController {
    async prepareGradeForSave(exam: Exam, module: Module) {
        exam.grade = String(exam.grade).replace(',', '.');
        module.exams.push(exam);
        module.calculateAverageGrade();
        module.color = new Color(module.average).color;
    }
}
