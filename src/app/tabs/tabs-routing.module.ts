import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthComponent} from "../components/auth/auth.component";

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
                path: 'modules',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../components/modules/modules.module').then(m => m.ModulesPageModule)
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../components/settings/settings.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/modules',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
