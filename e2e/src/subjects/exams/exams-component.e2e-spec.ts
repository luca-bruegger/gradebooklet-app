import ExamsComponentPage from './pages/exams-component.po';
import SubjectsComponentPage from '../pages/subjects-component.po';

describe('exam-component test', () => {
    let examPage: ExamsComponentPage;
    let subjectsPage: SubjectsComponentPage;

    beforeAll(() => {
        subjectsPage = new SubjectsComponentPage();
    });

    beforeEach(() => {
        examPage = new ExamsComponentPage();
        examPage.navigateTo();
    });

    it('should proof that validations are working', () => {
        subjectsPage.getFabButton().click();
    });
});
