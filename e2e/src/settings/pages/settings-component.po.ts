import { DefaultPageObject } from '../../default.po';
import { browser, by, element } from 'protractor';

const path = require('path');
const downloadsPath = path.resolve(__dirname, '../../../../downloads');
const fs = require('fs');
const file = '/file.pdf';
const filename = downloadsPath + file;


export default class SettingsComponentPage implements DefaultPageObject {
  navigateTo() {
    browser.get('/tabs/settings');
    return browser.waitForAngular();
  }

  getExportPDFButton() {
    return element.all(by.tagName('ion-button')).last();
  }

  getAlert() {
    return element(by.tagName('ion-alert'));
  }

  getAlertAgreeButton() {
    return element(by.tagName('ion-alert')).element(by.tagName('button'));
  }

  async deleteAlreadyDownloadedFiles() {
    if (await fs.existsSync(filename)) {
      await fs.unlinkSync(filename);
    }
  }

  async verifyFileDownload() {
    return await browser.driver.wait(async () => {
      return fs.existsSync(filename);
    }, 30000).then(() => {
      console.log('Getting the ERROR while downloading file because file is not downloaded.');
    });
  }
}
