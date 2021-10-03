import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from '../models/subject';
import { SubjectViewComponent } from '../components/subject-view/subject-view.component';
import { ModalController } from '@ionic/angular';
import { SubjectsController } from '../controllers/subjects.controller';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: Subject[] = [];
  private indexOfSelectedSubject = 0;

  constructor(private storage: Storage,
              private modalController: ModalController,
              private subjectsController: SubjectsController) {

    this.subjectsController.loadModulesFromDatabase().then(subjects => {
      this.subjects = subjects;
    });
  }

  async openModal(subject: Subject, isEdit: boolean) {
    this.indexOfSelectedSubject = this.subjects.indexOf(subject);
    const modal = await this.modalController.create({
      component: SubjectViewComponent,
      componentProps: {
        subject,
        isEdit
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((modalOverlay) => {
      const data = modalOverlay.data;
      if (!data) {
        return;
      }
      this.handleModalData(isEdit, data);

      this.storage.set('modules', JSON.stringify(this.subjects));
    });

    return modal.present();
  }

  get allModules() {
    return this.subjects;
  }

  private handleModalData(isEdit: boolean, data: any) {
    if (data.delete) {
      this.subjects.splice(this.indexOfSelectedSubject, 1);
      return;
    }

    if (data.save) {
      const editSubject = Object.assign(new Subject(), data.editModule);
      editSubject.calculateAverageGrade();
      isEdit ? this.updateSubject(editSubject) : this.subjects.push(editSubject);
    }
  }

  private updateSubject(updated: Subject) {
    this.subjects[this.indexOfSelectedSubject] = updated;
  }
}
