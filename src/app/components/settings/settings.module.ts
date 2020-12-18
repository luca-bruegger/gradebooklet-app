import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsPage} from './settings.page';
import {TranslateModule} from '@ngx-translate/core';
import {BackupPopoverComponent} from './backup-popover/backup-popover.component';
import {ModulesController} from '../../controllers/modules-controller';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: SettingsPage}]),
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [SettingsPage, BackupPopoverComponent]
})
export class SettingsPageModule {
}
