import { browser, by, element } from 'protractor';
import {  DefaultPageObject } from '../../default.po';

export class AppComponentPage implements DefaultPageObject {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }
}
