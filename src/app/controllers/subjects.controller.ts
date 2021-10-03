import { Subject } from '../models/subject';
import { Color } from '../models/color';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsController {
  colorController: Color = new Color();
  subjects: Subject[] = [];

  constructor(private storage: Storage) {}

  private async loadModules() {
    await this.storage.get('modules').then(data => {
      if (!!data) {
        this.subjects = JSON.parse(data);
      }
    });
  }

  async loadModulesFromDatabase() {
    await this.loadModules();
    return this.subjects;
  }
}

