import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModulesPage} from './modules.page';
import {TranslateModule} from '@ngx-translate/core';
import {ModuleViewComponent} from "../module-view/module-view.component";
import {ExamComponent} from "../../exam/exam.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ModulesPage}]),
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [ModulesPage, ModuleViewComponent, ExamComponent]
})
export class ModulesPageModule {
}
