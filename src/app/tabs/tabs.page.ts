import { Component } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Module } from '../models/module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private subjectService: SubjectService) {}

  async addSubject() {
    await this.subjectService.openModal(new Module(), false);
  }
}
