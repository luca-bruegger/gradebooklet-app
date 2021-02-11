import SubjectsComponentPage from './pages/subjects-component.po';
import { browser, by, protractor } from 'protractor';

describe('subject-component test', () => {
  let page: SubjectsComponentPage;

  const moduleName = 'Module 1';
  const alteredModuleName = 'Module 2';
  const until = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new SubjectsComponentPage();
    page.navigateTo();
    page.deleteAllSubjects();
  });

  it('should navigate to subjects and create a new one', () => {
    expect(page.getEditModal().isPresent()).toBeFalsy();
    expect(page.getSubjectsArrayElement().isPresent()).toBeTruthy();

    page.getFabButton().click();

    expect(page.getEditModal()).toBeTruthy();

    page.fillEditModalWith(moduleName);

    expect(page.getSubjectsArrayElement().isPresent()).toBeTruthy();
    browser.wait(until.invisibilityOf(page.getEditModal()), 5000);
    expect(page.getSubjectsArrayElement().getWebElement().getText()).toContain(moduleName);
    expect(page.getEditModal().isPresent()).toBeFalsy();
  });

  it('should open subject edit modal and alter module name', () => {
    page.getFabButton().click();
    page.fillEditModalWith(moduleName);

    browser.wait(until.invisibilityOf(page.getEditModal()), 5000);

    expect(page.getSubjectsArrayElement().isPresent()).toBeTruthy();
    expect(page.getEditModal().isPresent()).toBeFalsy();

    page.getFirstItemInSubjectsList().click();

    expect(page.getEditModal().isPresent()).toBeTruthy();

    browser.wait(until.visibilityOf(page.getEditModal()), 5000);
    expect(page.getEditModal().getWebElement().getText()).toContain(moduleName);
    page.fillEditModalWith(alteredModuleName);

    browser.wait(until.invisibilityOf(page.getEditModal()), 5000);
    expect(page.getFirstItemInSubjectsList().getWebElement().getText()).toContain(alteredModuleName);
  });

  it('should delete all modules', () => {
    page.getFabButton().click();
    page.fillEditModalWith(moduleName);

    browser.wait(until.invisibilityOf(page.getEditModal()), 5000);

    const allModuleItems = page.getSubjectsArrayElement().all(by.tagName('ion-item'));
    allModuleItems.each(item => {
      expect(item.isPresent()).toBeTruthy();
      item.click();
      browser.wait(until.visibilityOf(page.getEditModal()), 5000);

      page.getDeleteButton().click();

      browser.wait(until.invisibilityOf(page.getEditModal()), 5000);
      expect(page.getEditModal().isPresent()).toBeFalsy();
      expect(item.isPresent()).toBeFalsy();
    });

    expect(page.getSubjectsArrayElement().all(by.tagName('ion-item')).count()).toEqual(0);
  });
});
