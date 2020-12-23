import { browser, protractor } from 'protractor';
import SubjectsComponentPage from '../../pages/subjects-component.po';
import ExamsComponentPage from '../pages/exams-component.po';
import GradesComponentPage from './pages/grades-component.po';

describe('grade-component test', () => {
  let subjectPage: SubjectsComponentPage;
  let examPage: ExamsComponentPage;
  let gradePage: GradesComponentPage;

  const examName = 'Exam 1';
  const examGrade = '5.3';

  const invalidExamName = 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf'; // 52 Chars
  const invalidGrade = 'asdf';

  const until = protractor.ExpectedConditions;

  beforeAll(() => {
    subjectPage = new SubjectsComponentPage();
    examPage = new ExamsComponentPage();
  });

  beforeEach(() => {
    gradePage = new GradesComponentPage();
    gradePage.navigateTo();
  });

  afterEach(() => {
    // subjectPage.getExitFromEditModalButton().click();
    // browser.wait(until.invisibilityOf(subjectPage.getEditModal()));
  });

  it('should proof that grade name validations are working within edit modal', () => {
    subjectPage.getFabButton().click();
    browser.wait(until.presenceOf(subjectPage.getEditModal()));
    subjectPage.fillEditModalWith('Subject 1');
    browser.wait(until.invisibilityOf(subjectPage.getEditModal()));

    subjectPage.getFirstItemInSubjectsList().click();
    browser.wait(until.visibilityOf(subjectPage.getEditModal()));

    gradePage.getExamNameField().sendKeys(examName);
    gradePage.getAddExamButton().click();

    expect(gradePage.getExamAlert().isPresent()).toBeTruthy();

    gradePage.clickExamAlertCloseButton();

    browser.wait(until.invisibilityOf(gradePage.getExamAlert()));
    expect(gradePage.getExamAlert().isPresent()).toBeFalsy();

    gradePage.setExamName(invalidExamName);
    gradePage.getExamGradeField().sendKeys(examGrade);

    gradePage.getAddExamButton().click();
    expect(gradePage.getExamAlert().isPresent()).toBeFalsy();

    gradePage.getExamGradeField().clear();
    gradePage.getExamGradeField().sendKeys(invalidGrade);
    gradePage.getExamNameField().sendKeys(examGrade);

    gradePage.getAddExamButton().click();

    browser.wait(until.visibilityOf(gradePage.getExamAlert()), 5000);
    expect(gradePage.getExamAlert().isPresent()).toBeTruthy();
    gradePage.clickExamAlertCloseButton();
    browser.wait(until.invisibilityOf(gradePage.getExamAlert()), 5000);

    expect(gradePage.getExamAlert().isPresent()).toBeFalsy();
  });

  it('should show alert when trying to add exam without values', () => {
    subjectPage.getFabButton().click();
    browser.wait(until.presenceOf(subjectPage.getEditModal()));
    expect(subjectPage.getEditModal().isDisplayed()).toBeTruthy();
    expect(gradePage.getExamComponent().isDisplayed()).toBeTruthy();
    expect(gradePage.getExamAlert().isPresent()).toBeFalsy();

    expect(gradePage.getAddExamButton().isPresent()).toBeTruthy();
    gradePage.getAddExamButton().click();
    expect(gradePage.getExamAlert().isDisplayed()).toBeTruthy();
    //
    // gradePage.clickExamAlertCloseButton();
    // browser.wait(until.invisibilityOf(gradePage.getExamAlert()));
    // expect(gradePage.getExamAlert().isPresent()).toBeFalsy();
    //
    // expect(gradePage.getExamListElements().count()).toEqual(0);
  });
});
