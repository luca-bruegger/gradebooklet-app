import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectsPage } from './subjects.page';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleViewComponent } from '../module-view/module-view.component';
import { ExamComponent } from '../../exam/exam.component';
import { PdfController } from '../../controllers/pdf-controller';

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
  declarations: [SubjectsPage, ModuleViewComponent, ExamComponent]
})
export class SubjectsPageModule {
}
