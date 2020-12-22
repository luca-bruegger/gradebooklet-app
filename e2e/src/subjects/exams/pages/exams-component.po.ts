import { DefaultPageObject } from '../../../default.po';
import { browser, by, element } from 'protractor';

export default class ExamsComponentPage implements DefaultPageObject {
  navigateTo() {
    browser.get('/');
    return browser.waitForAngular();
  }

  getAllInputs() {
    return element(by.tagName('ion-modal')).all(by.tagName('input'));
  }

  getNameField() {
    return this.getAllInputs().first();
  }

  getRoomField() {
    return this.getAllInputs().get(1);
  }

  getTeacherField() {
    return this.getAllInputs().get(2);
  }

  getBuildingField() {
    return this.getAllInputs().get(3);
  }

  getExamNameField() {
    return this.getAllInputs().get(4);
  }

  getExamGradeField() {
    return this.getAllInputs().get(5);
  }

  getGradesystemSelect() {
    return element(by.tagName('ion-select'));
  }
}
