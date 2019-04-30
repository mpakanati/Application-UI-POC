import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import {
  CIAssetManagementActionTypes,
  LoadAssets,
  PostAssetsTag,
  AssetsLoaded,
  AssetsLoadedFailed,
  PostAssetsTagSuccess,
  PostAssetsTagFailed,
  SearchAssetAction,
  SearchAssetActionSuccess,
  SearchAssetActionFailed
} from './ci-assetmanagement.actions';
import { AssetState } from './ci-assetmanagement.reducer';
import { DataPersistence } from '@nrwl/nx';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {CiAssetManagementMockData} from '../ci-assetmanagement.mockdata';
import  { CIAssetManagementService } from '../ci-assetmanagement.service';
import { of } from 'rxjs';

@Injectable()
export class AssetEffects {
  constructor(
    private dataPersistence: DataPersistence<AssetState>,
    private ciassetManagementService: CIAssetManagementService
  ) { }

  @Effect()
  GetAssets$ = this.dataPersistence.fetch(
    CIAssetManagementActionTypes.LoadAssets,
    {
      run: (action: LoadAssets) => {
        //
        // return this.ciassetManagementService
        //   .getAssets(action.payload)
        //   .pipe(
        //   map((assetData) => {
        //     const records = {
        //       records: []
        //     }
        //     return new AssetsLoaded(assetData? assetData: records)
        //   }));
        return new AssetsLoaded(CiAssetManagementMockData);
      },

      onError: (action: LoadAssets, error) => {
        console.error('Error', error);
        return new AssetsLoadedFailed(error);
      }
    }
  );
  @Effect()
  PostAsset$ = this.dataPersistence.fetch(
    CIAssetManagementActionTypes.PostAssetsTag,
    {
      run: (action: PostAssetsTag) => {
        return this.ciassetManagementService
          .postAssets(action.payload).pipe(
            map((assetData) => {
              return new PostAssetsTagSuccess();
            }));
      },
      onError: (action: PostAssetsTag,error) => {
        //TODO: Handle Failure Scenario
        console.error(error);
      }
    }
  );
    @Effect()
  SearchAssets$ = this.dataPersistence.fetch(CIAssetManagementActionTypes.SearchAssetAction, {
    run: (action: SearchAssetAction, state: AssetState) => {
      return this.ciassetManagementService
        .searchAssets(action.payload)
        .pipe(
          map(assetData => new SearchAssetActionSuccess(assetData)),
          catchError(err => of(new SearchAssetActionFailed()))
        )
    },

    onError: (action: SearchAssetAction, error) => {
      return new SearchAssetActionFailed();
    }
  });
}
