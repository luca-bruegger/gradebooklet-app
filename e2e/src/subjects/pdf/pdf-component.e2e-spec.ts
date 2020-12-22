import SubjectsComponentPage from '../pages/subjects-component.po';
import { browser, by, protractor } from 'protractor';
import PdfComponentPage from './pages/pdf-component.po';

describe('pdf-component test', () => {
  let subjectsPage: SubjectsComponentPage;
  let pdfPage: PdfComponentPage;

  const until = protractor.ExpectedConditions;
  const moduleName = 'Module 1';

  beforeAll(() => {
    subjectsPage = new SubjectsComponentPage();
  });

  beforeEach(() => {
    pdfPage = new PdfComponentPage();
    pdfPage.navigateTo();
  });

  it('should trigger warning when no modules are available for export', async () => {
    await subjectsPage.deleteAllSubjects();

    browser.wait(until.elementToBeClickable(pdfPage.getExportPDFButton()), 5000);
    expect(subjectsPage.getAllItems().count()).toBe(0);
    pdfPage.getExportPDFButton().click();

    expect(pdfPage.getAlert().isPresent()).toBeTruthy();
    expect(pdfPage.getAlertAgreeButton().isPresent()).toBeTruthy();

    pdfPage.getAlertAgreeButton().click();

    browser.wait(until.invisibilityOf(pdfPage.getAlert()));

    expect(pdfPage.getAlert().isPresent()).toBeFalsy();
    expect(pdfPage.getAlertAgreeButton().isPresent()).toBeFalsy();
  });

  it('should proof that pdf exports are working as expected', () => {
    subjectsPage.getFabButton().click();

    subjectsPage.fillEditModalWith(moduleName);

    expect(subjectsPage.getSubjectsList().isPresent()).toBeTruthy();
    browser.wait(until.invisibilityOf(subjectsPage.getEditModal()), 5000);
    expect(subjectsPage.getFirstItemInSubjectsList().getWebElement().getText()).toContain(moduleName);

    pdfPage.deleteAlreadyDownloadedFiles();
    pdfPage.getExportPDFButton().click();
    pdfPage.verifyFileDownload();
  });
});

