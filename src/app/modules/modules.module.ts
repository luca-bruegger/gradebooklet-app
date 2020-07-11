import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModulesPage } from './modules.page';
import {EditModuleComponent} from '../edit-module/edit-module.component';
import {AddModuleComponent} from '../add-module/add-module.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ModulesPage}]),
        TranslateModule,
        ReactiveFormsModule
    ],
  declarations: [ModulesPage, EditModuleComponent, AddModuleComponent],
  entryComponents: [EditModuleComponent, AddModuleComponent]
})
export class ModulesPageModule {}
