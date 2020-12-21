import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthComponent } from '../components/auth/auth.component';
import { AuthGuard } from '../components/auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'subjects',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../components/subjects/subjects.module').then(m => m.SubjectsPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../components/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/subjects',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
