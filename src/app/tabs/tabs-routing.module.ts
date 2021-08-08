import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ExtendedSecurityComponent } from '../components/auth/extended-security.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from '../components/auth/gradebooklet-account/register/register.component';
import { LoginComponent } from '../components/auth/gradebooklet-account/login/login.component';
import { VerifyEmailComponent } from '../components/auth/gradebooklet-account/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
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
        pathMatch: 'full',
        redirectTo: 'subjects'
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent
      },
      {
        path: 'extended-security',
        component: ExtendedSecurityComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
