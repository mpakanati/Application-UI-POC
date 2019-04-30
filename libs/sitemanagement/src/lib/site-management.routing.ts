import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSiteComponent } from './add-site/add-site.component';
//import { SiteDetailsComponent } from './site-details/site-details.component';

import { SafeExitGuardService } from './safe-exit-guard.service';

export const siteManagementRoutes: Routes = [
  {
    path: 'sites/addsite',
    component: AddSiteComponent,
    //canActivate: [AuthGuardService], //TODO: use of login-implicit-grant auth-service should be avoided,
   // canDeactivate: [SafeExitGuardService]
  },
  {
    path: 'sites/editsite/:id',
    component: AddSiteComponent,
  //  canActivate: [AuthGuardService],
   // canDeactivate: [SafeExitGuardService]
  }
  // {
  //   path: 'dashboard/site-details/:id',
  //   component: SiteDetailsComponent,
  //  // canActivate: [AuthGuardService]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(siteManagementRoutes)],
  exports: [RouterModule]
})
export class SiteManagementRouting {}
