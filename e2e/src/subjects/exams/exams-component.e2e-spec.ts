import ExamsComponentPage from './pages/exams-component.po';
import SubjectsComponentPage from '../pages/subjects-component.po';
import { browser, protractor } from 'protractor';

describe('exam-component test', () => {
  let examPage: ExamsComponentPage;
  let subjectsPage: SubjectsComponentPage;

  const until = protractor.ExpectedConditions;
  const nameLongerThanAllowed = 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasfdasdf'; // 52 Chars

  const moduleName = 'Module 1 Name';
  const teacherName = 'Module 1 Teacher';
  const roomName = 'Module 1 Room';
  const buildingName = 'Module 1 Building';

  beforeAll(() => {
    subjectsPage = new SubjectsComponentPage();
  });

  beforeEach(() => {
    examPage = new ExamsComponentPage();
    examPage.navigateTo();
  });

  it('should proof that validations are working when making a new modal', () => {
    subjectsPage.getFabButton().click();
    expect(subjectsPage.getEditModal().isPresent()).toBeTruthy();

    browser.wait(until.visibilityOf(subjectsPage.getEditModal()));

    examPage.getNameField().sendKeys(nameLongerThanAllowed);
    examPage.getRoomField().sendKeys(roomName);
    examPage.getTeacherField().sendKeys(teacherName);
    examPage.getBuildingField().sendKeys(buildingName);

    subjectsPage.getSubmitButtonInEditModal().click();

    browser.wait(until.invisibilityOf(subjectsPage.getEditModal()));
    expect(subjectsPage.getEditModal().isPresent()).toBeFalsy();

    let textOfFirstSubjectItemInList = subjectsPage.getFirstItemInSubjectsList().getWebElement().getText();
    expect(textOfFirstSubjectItemInList).toContain(nameLongerThanAllowed.substring(0, nameLongerThanAllowed.length - 2));
    expect(textOfFirstSubjectItemInList).toContain(teacherName);
    expect(textOfFirstSubjectItemInList).toContain(roomName);
    expect(textOfFirstSubjectItemInList).toContain(buildingName);

    subjectsPage.getFirstItemInSubjectsList().click();
    expect(subjectsPage.getEditModal().isPresent()).toBeTruthy();

    browser.wait(until.visibilityOf(subjectsPage.getEditModal()));

    examPage.getNameField().clear();
    examPage.getNameField().sendKeys(moduleName);
    subjectsPage.getSubmitButtonInEditModal().click();

    browser.wait(until.invisibilityOf(subjectsPage.getEditModal()));
    expect(subjectsPage.getEditModal().isPresent()).toBeFalsy();

    textOfFirstSubjectItemInList = subjectsPage.getFirstItemInSubjectsList().getWebElement().getText();
    expect(textOfFirstSubjectItemInList).toContain(moduleName);
    subjectsPage.deleteAllSubjects();
  });
});
