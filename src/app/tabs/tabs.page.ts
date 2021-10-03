import { Component } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private subjectService: SubjectService) {}

  async addSubject() {
    await this.subjectService.openModal(new Subject(), false);
  }
}
