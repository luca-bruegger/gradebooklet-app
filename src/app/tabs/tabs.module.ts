import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { TranslateModule } from '@ngx-translate/core';
import { ExtendedSecurityComponent } from '../components/auth/extended-security.component';

@NgModule({
  entryComponents: [ExtendedSecurityComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ExtendedSecurityComponent, TabsPage]
})
export class TabsPageModule {
}


