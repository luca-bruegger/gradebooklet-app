import {Exam} from './exam';

export class Module {
    name: string;
    teacher: string;
    room: string;
    building: string;
    exams: Exam[] = [];
    average: number;
    color: string;

    calculateAverageGrade() {
        let average = 0;
        if (this.exams.length === 1) {
            average = Number(this.exams[0].grade);
        } else {
            if (!!this.exams) {
                this.exams.forEach(exam => {
                    average += Number(exam.grade);
                });
                average = average / this.exams.length;
            }
        }
        this.average = Number(average.toFixed(1));
    }
}


