import { Component, isDevMode } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { Subject } from '../../models/subject';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SubjectService } from '../../services/subject.service';
import { AppearanceService } from '../../services/appearance.service';
import { SlidesComponent } from '../slides/slides.component';
import { PdfController } from '../../controllers/pdf.controller';

@Component({
  selector: 'app-modules-tab',
  templateUrl: 'subjects.page.html',
  styleUrls: ['subjects.page.scss']
})
export class SubjectsPage {
  subjectService: SubjectService;

  constructor(private modalController: ModalController,
              private storage: Storage,
              private translate: TranslateService,
              private datePipe: DatePipe,
              private plt: Platform,
              private fileOpener: FileOpener,
              private file: File,
              private faio: FingerprintAIO,
              private platform: Platform,
              private navCtrl: NavController,
              private alertController: AlertController,
              private pdfController: PdfController,
              private appearanceService: AppearanceService,
              private slidesComponent: SlidesComponent,
              subjectService: SubjectService) {
    this.storage.get('firstLaunch').then(async val => {
      if (val === null && !isDevMode()) {
        await slidesComponent.present();
      }
    });
    this.subjectService = subjectService;
  }

  async openEditModal(subject) {
    await this.subjectService.openModal(subject, true);
  }

  createRoomTextForModule(m: Subject) {
    if (!!m.room && !!m.building) {
      return m.room + '  ' + m.building;
    }
    if (!!m.room) {
      return m.room;
    }
    if (!!m.building) {
      return m.building;
    }
    return '';
  }

  get noneSubjectsArePresent() {
    return this.subjectService.allModules.length === 0;
  }

  openOptions() {

  }

  getBackgroundColor(backgroundColor: string) {
    return !this.appearanceService.isDarkModeEnabled ?
      backgroundColor : '';
  }

  getFontColor(fontColor: string) {
    return this.appearanceService.isDarkModeEnabled ?
      fontColor : '#333333';
  }
}
