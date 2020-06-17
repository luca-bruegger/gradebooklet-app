export class Color {
    private readonly colorstage: string;

    constructor(averageGrade) {
        if (averageGrade >= 5.5) {
            this.colorstage = 'linear-gradient(-38deg, greenyellow, green, green, green)';
            return;
        }
        if (averageGrade >= 5) {
            this.colorstage = 'linear-gradient(-38deg, greenyellow, greenyellow, green)';
            return;
        }
        if (averageGrade >= 4.5) {
            this.colorstage = 'linear-gradient(-38deg, orange, orange, orange, yellow)';
            return;
        }
        if (averageGrade >= 4) {
            this.colorstage = 'linear-gradient(-38deg, red, orange, orange, orange)';
        } else {
            this.colorstage = 'linear-gradient(-38deg, darkred, darkred, red)';
        }
    }

    get color() {
        return this.colorstage;
    }
}

