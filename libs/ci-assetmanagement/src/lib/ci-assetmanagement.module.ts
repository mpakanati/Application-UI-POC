import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  assetReducer,
  initialState as assetInitialState
} from './+state/ci-assetmanagement.reducer';
import { AssetEffects } from './+state/ci-assetmanagement.effects';
import { CIAssetManagementService } from './ci-assetmanagement.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTPInterceptorModule } from '@cc/http-interceptor';

@NgModule({
  imports: [
    CommonModule,           
    HttpClientModule,
    HTTPInterceptorModule,
    StoreModule.forFeature('ciassetManagement', assetReducer, {
      initialState: assetInitialState
    }),
    EffectsModule.forFeature([AssetEffects])
  ],
  declarations: [],
  providers: [AssetEffects, CIAssetManagementService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CiAssetmanagementModule {

}
 