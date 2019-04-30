import { Action } from '@ngrx/store';
import { Entity } from './app-store.reducer';

export enum AppStoreActionTypes {
  LoadAppStore = '[AppStore] Load AppStore',
  AppStoreLoaded = '[AppStore] AppStore Loaded',
  AppStoreLoadError = '[AppStore] AppStore Load Error'
}

export class LoadAppStore implements Action {
  readonly type = AppStoreActionTypes.LoadAppStore;
}

export class AppStoreLoadError implements Action {
  readonly type = AppStoreActionTypes.AppStoreLoadError;
  constructor(public payload: any) {}
}

export class AppStoreLoaded implements Action {
  readonly type = AppStoreActionTypes.AppStoreLoaded;
  constructor(public payload: Entity[]) {}
}

export type AppStoreAction = LoadAppStore | AppStoreLoaded | AppStoreLoadError;

export const fromAppStoreActions = {
  LoadAppStore,
  AppStoreLoaded,
  AppStoreLoadError
};
