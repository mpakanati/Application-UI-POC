import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SiteComponent } from './site/site.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiCoreModule } from  '@cc/ui-core';
import { MatMenuModule } from '@angular/material/menu';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {
  siteReducer,
  initialState as siteInitialState
} from './+state/site-management.reducer';

import { SiteEffects } from './+state/site-management.effects';
import { SiteManagementService } from './site-management.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTPInterceptorModule } from '@cc/http-interceptor';

import { SiteManagementRouting } from './site-management.routing';
import { AddSiteComponent } from './add-site/add-site.component';
import { SummaryComponent } from './add-site/summary/summary.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
// import {  } from '@angular/material/select';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule } from '@angular/material';
import { CiAssetmanagementModule } from '@cc/ci-assetmanagement';
import { SetLocationComponent } from './add-site/set-location/set-location.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlockSpecialCharDirective } from './add-site/block-special-char.directive';
import { GooglePlaceSuggestionModule } from '@cc/google-place-suggestion';

import { AssignAssetsComponent } from './add-site/assign-assets/assign-assets.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';




import { SafeExitGuardService } from './safe-exit-guard.service';

@NgModule({
  imports: [
    ReactiveFormsModule, FormsModule, MatSelectModule,
    CdkStepperModule,
    CommonModule,
    InfiniteScrollModule,
    MatMenuModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule,
    UiCoreModule,
    HTTPInterceptorModule,
    SiteManagementRouting,
    CiAssetmanagementModule,
    GooglePlaceSuggestionModule,
    StoreModule.forFeature('siteManagement',  siteReducer, {
      initialState: siteInitialState
    }),
    EffectsModule.forFeature([SiteEffects])
  ],
  declarations: [SiteComponent, AddSiteComponent,  AssignAssetsComponent, SummaryComponent, SetLocationComponent, BlockSpecialCharDirective],
  providers: [SiteEffects, SiteManagementService,  SafeExitGuardService, DatePipe],
  exports:[SiteComponent, AddSiteComponent, SummaryComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteManagementModule {
  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: SiteManagementModule,
      providers: [SiteManagementService, { provide: 'siteConfig', useValue: config }]
    }
  }
}
