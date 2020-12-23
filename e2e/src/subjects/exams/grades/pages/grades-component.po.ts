import { browser, by, element, protractor } from 'protractor';
import { DefaultPageObject } from '../../../../default.po';

export default class GradesComponentPage implements DefaultPageObject {
  readonly until = protractor.ExpectedConditions;

  navigateTo() {
    browser.get('/');
    return browser.waitForAngular();
  }

  private getExamComponent() {
    return element(by.tagName('ion-modal')).element(by.tagName('app-exam'));
  }

  getExamNameField() {
    return this.getExamComponent().all(by.tagName('div')).first().all(by.tagName('input')).first();
  }

  getExamGradeField() {
    return this.getExamComponent().all(by.tagName('div')).first().all(by.tagName('input')).last();
  }

  getAddExamButton() {
    return element(by.css('app-exam ion-button'));
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
    browser.wait(this.until.elementToBeClickable(this.getExamNameField()));
    await this.getExamNameField().clear();
    await this.getExamNameField().sendKeys(examName);
  }
}
