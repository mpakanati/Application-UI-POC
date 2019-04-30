
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UiCoreModule } from '@cc/ui-core';
import { SiteManagementModule, WizardSteps } from '@cc/sitemanagement';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';
import {
  APPSTORE_FEATURE_KEY,
  initialState as appStoreInitialState,
  appStoreReducer
} from './+state/app-store.reducer';
import { AppStoreEffects } from './+state/app-store.effects';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    UiCoreModule,
    NxModule.forRoot(),
    SiteManagementModule.forRoot({
      'siteWizardSteps': [
        {
          'label': WizardSteps.setLocation,
          'optional': false
        },
        {
          'label': WizardSteps.assignAssets,
          'optional': true,
          'action': {
            'assignTag':false
          }
        },
        {
          'label': WizardSteps.summary,
          'optional': false,
          'action': {'createGroupId': false}
        }],
      'siteRedirectUrl' : {
          'siteDetail' : '/dashboard/site-details',
          'advanceProductivity': '',
          'tabluae':''
      },
      'showSiteId' : true,
      'showSubscriptionAndaddall': false,
      'showZones': false,
      'addAppName': false,
      'showSearch': false
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppStoreEffects])
  ],
  providers: [],
  exports: [ RouterModule ],
  bootstrap: [AppComponent],
  entryComponents: [DashboardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule {}
