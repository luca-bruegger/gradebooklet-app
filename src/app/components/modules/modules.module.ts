import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModulesPage} from './modules.page';
import {TranslateModule} from '@ngx-translate/core';
import {ModuleViewComponent} from '../module-view/module-view.component';
import {ExamComponent} from '../../exam/exam.component';
import {PdfController} from '../../controllers/pdf-controller';
import {SettingsPageModule} from '../settings/settings.module';
import {ModulesController} from '../../controllers/modules-controller';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ModulesPage}]),
        TranslateModule,
        ReactiveFormsModule,
        SettingsPageModule
    ],
    providers: [PdfController, ModulesController],
    declarations: [ModulesPage, ModuleViewComponent, ExamComponent]
})
export class ModulesPageModule {
}
