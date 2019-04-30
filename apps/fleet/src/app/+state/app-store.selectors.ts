import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APPSTORE_FEATURE_KEY, AppStoreState } from './app-store.reducer';

// Lookup the 'AppStore' feature state managed by NgRx
const getAppStoreState = createFeatureSelector<AppStoreState>(
  APPSTORE_FEATURE_KEY
);

const getLoaded = createSelector(
  getAppStoreState,
  (state: AppStoreState) => state.loaded
);
const getError = createSelector(
  getAppStoreState,
  (state: AppStoreState) => state.error
);

const getAllAppStore = createSelector(
  getAppStoreState,
  getLoaded,
  (state: AppStoreState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getAppStoreState,
  (state: AppStoreState) => state.selectedId
);
const getSelectedAppStore = createSelector(
  getAllAppStore,
  getSelectedId,
  (appStore, id) => {
    const result = appStore.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const appStoreQuery = {
  getLoaded,
  getError,
  getAllAppStore,
  getSelectedAppStore
};
