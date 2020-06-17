import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModulesPage } from './modules.page';
import {ModalViewComponent} from '../modal-view/modal-view.component';
import {AddModuleModalComponent} from '../add-module-modal/add-module-modal.component';
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
  declarations: [ModulesPage, ModalViewComponent, AddModuleModalComponent],
  entryComponents: [ModalViewComponent, AddModuleModalComponent]
})
export class ModulesPageModule {}
