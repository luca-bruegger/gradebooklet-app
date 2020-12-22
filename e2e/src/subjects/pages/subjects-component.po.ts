import { DefaultPageObject } from '../../default.po';
import { browser, by, element } from 'protractor';

export default class SubjectsComponentPage implements DefaultPageObject {

  async navigateTo() {
    await browser.get('/');
    return browser.waitForAngular();
  }

  getSubjectsList() {
    return element(by.css('ion-list'));
  }

  getEditModal() {
    return element(by.css('ion-modal'));
  }

  getFabButton() {
    return element(by.css('ion-fab-button'));
  }

  getFirstItemInSubjectsList() {
    return this.getSubjectsList().all(by.tagName('ion-item')).first();
  }

  getModuleNameField() {
    return this.getModalInputs().first();
  }

  getModalInputs() {
    return this.getEditModal().all(by.tagName('input'));
  }

  getSubmitButtonInEditModal() {
    return element(by.css('ion-fab-button[color="success"]'));
  }

  fillEditModalWith(name: string) {
    this.getModuleNameField().clear();
    this.getModuleNameField().sendKeys(name);
    return this.getSubmitButtonInEditModal().click();
  }

  getDeleteButton() {
    return this.getEditModal().all(by.css('ion-button[color="danger"]')).first();
  }
}
