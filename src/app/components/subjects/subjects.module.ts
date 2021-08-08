import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectsPage } from './subjects.page';
import { TranslateModule } from '@ngx-translate/core';
import { SubjectViewComponent } from '../subject-view/subject-view.component';
import { PdfController } from '../../controllers/pdf.controller';
import { ExamComponent } from '../exam/exam.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: SubjectsPage}]),
    TranslateModule,
    ReactiveFormsModule
  ],
  providers: [PdfController],
  declarations: [SubjectsPage, SubjectViewComponent, ExamComponent]
})
export class SubjectsPageModule {
}
