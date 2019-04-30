import { Routes } from '@angular/router';
import { SiteComponent } from '@cc/sitemanagement';
import {DashboardComponent} from './dashboard/dashboard.component';
export const appRoutes: Routes = [
    { path: '',redirectTo: '/sites', pathMatch: 'full' },
    {path:'dashboard',component:DashboardComponent},
    { path: 'sites', component:SiteComponent}
  ];
