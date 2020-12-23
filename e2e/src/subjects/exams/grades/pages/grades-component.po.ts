import { browser, by, element, protractor } from 'protractor';
import { DefaultPageObject } from '../../../../default.po';

export default class GradesComponentPage implements DefaultPageObject {
  readonly until = protractor.ExpectedConditions;

  navigateTo() {
    browser.get('/');
    return browser.waitForAngular();
  }

  getExamCard() {
    return element(by.tagName('ion-modal')).all(by.tagName('ion-card')).get(2);
  }

  getExamNameField() {
    const field = element.all(by.tagName('input')).get(5);
    browser.wait(this.until.elementToBeClickable(field));
    return field;
  }

  getExamGradeField() {
    const field = element.all(by.tagName('input')).get(6);
    browser.wait(this.until.elementToBeClickable(field));
    return field;
  }

  getAddExamButton() {
    return this.getExamCard().element(by.tagName('ion-button'));
  }

  getExamAlert() {
    return element(by.tagName('ion-alert'));
  }

  getExamCloseButton() {
    return this.getExamAlert().element(by.tagName('button'));
  }

  getExamList() {
    return element(by.tagName('app-exam ion-list'));
  }

  getExamListElements() {
    return this.getExamList().all(by.tagName('ion-item'));
  }

  async setExamName(examName: string) {
    await this.getExamNameField().clear();
    await this.getExamNameField().sendKeys(examName);
  }
}
