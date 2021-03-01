import { browser, protractor } from 'protractor';
import SubjectsComponentPage from '../subjects/pages/subjects-component.po';
import SettingsComponentPage from './pages/settings-component.po';

describe('settings-component test', () => {
  let subjectsPage: SubjectsComponentPage;
  let settingsPage: SettingsComponentPage;

  const until = protractor.ExpectedConditions;
  const moduleName = 'Module 1';

  beforeAll(() => {
    subjectsPage = new SubjectsComponentPage();
  });

  beforeEach(() => {
    settingsPage = new SettingsComponentPage();
    subjectsPage.navigateTo();
    subjectsPage.deleteAllSubjects();
  });

  it('should proof that pdf exports are working as expected', () => {
    subjectsPage.getFabButton().click();

    expect(subjectsPage.getEditModal().isPresent()).toBeTruthy();
    subjectsPage.fillEditModalWith(moduleName);

    expect(subjectsPage.getImageElement().isPresent()).toBeTruthy();
    browser.wait(until.invisibilityOf(subjectsPage.getEditModal()), 5000);
    expect(subjectsPage.getFirstItemInSubjectsList().getWebElement().getText()).toContain(moduleName);

    settingsPage.navigateTo();
    settingsPage.deleteAlreadyDownloadedFiles();
    settingsPage.getExportPDFButton().click();
  });

  it('should trigger warning when no modules are available for export', async () => {
    expect(subjectsPage.getAllItems().count()).toBe(0);
    settingsPage.navigateTo();
    settingsPage.getExportPDFButton().click();

    expect(settingsPage.getAlert().isPresent()).toBeTruthy();
    expect(settingsPage.getAlertAgreeButton().isPresent()).toBeTruthy();

    settingsPage.getAlertAgreeButton().click();

    browser.wait(until.invisibilityOf(settingsPage.getAlert()));

    expect(settingsPage.getAlert().isPresent()).toBeFalsy();
    expect(settingsPage.getAlertAgreeButton().isPresent()).toBeFalsy();
  });
});

