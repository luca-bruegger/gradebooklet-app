import { DefaultPageObject } from '../../default.po';
import { browser, by, element, protractor } from 'protractor';

export default class SubjectsComponentPage implements DefaultPageObject {
  private readonly until = protractor.ExpectedConditions;

  async navigateTo() {
    await browser.get('/');
    return browser.waitForAngular();
  }

  getSubjectsArrayElement() {
    return element(by.css('div.wrapper'));
  }

  getEditModal() {
    return element(by.css('ion-modal'));
  }

  getFabButton() {
    return element(by.css('ion-fab-button'));
  }

  getFirstItemInSubjectsList() {
    return this.getSubjectsArrayElement().all(by.tagName('ion-card')).first();
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

  getAllItems() {
    return this.getSubjectsArrayElement().all(by.tagName('ion-card'));
  }

  getExitFromEditModalButton() {
    return this.getEditModal().element(by.tagName('ion-buttons')).element(by.tagName('ion-button'));
  }

  async deleteAllSubjects() {
    if (await this.getSubjectsArrayElement().isPresent()) {
      this.getAllItems().each(async item => {
        await item.click();
        browser.wait(this.until.visibilityOf(this.getEditModal()), 5000);
        await this.getDeleteButton().click();
        browser.wait(this.until.invisibilityOf(this.getEditModal()), 5000);
      });
    }
  }

  getImageElement() {
    return element(by.css('div.image-wrapper'));
  }
}
