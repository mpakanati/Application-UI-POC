import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState } from './ci-assetmanagement.reducer';

// Lookup the 'App' feature state managed by NgRx
export const getAssetState = createFeatureSelector<AssetState>('ciassetManagement');


export const assets = createSelector(
  getAssetState,
  (state: AssetState) => state.assets
);
export const nextUrl = createSelector(
  getAssetState,
  (state: AssetState) => state.nextUrl
);

export const totalCount = createSelector(
  getAssetState,
  (state: AssetState) => state.totalCount
);

export const filteredAssets = createSelector(
  getAssetState,
  (state: AssetState) => state.filteredAssets
);

export const emptySearchResult = createSelector(
  getAssetState,
  (state: AssetState) => state.isEmptySearchResults
);
