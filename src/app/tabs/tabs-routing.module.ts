import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthComponent } from '../components/auth/auth.component';
import { AuthGuard } from '../components/auth/auth.guard';
import { RegisterComponent } from '../components/auth/register/register.component';
import { LoginComponent } from '../components/auth/login/login.component';

const routes: Routes = [
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
        path: 'auth',
        component: AuthComponent
      },
      {
        path: '',
        canActivate: [AuthGuard],
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
