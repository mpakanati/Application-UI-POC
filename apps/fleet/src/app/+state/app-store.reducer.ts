import { AppStoreAction, AppStoreActionTypes } from './app-store.actions';

export const APPSTORE_FEATURE_KEY = 'appStore';

/**
 * Interface for the 'AppStore' data used in
 *  - AppStoreState, and
 *  - appStoreReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AppStoreState {
  list: Entity[]; // list of AppStore; analogous to a sql normalized table
  selectedId?: string | number; // which AppStore record has been selected
  loaded: boolean; // has the AppStore list been loaded
  error?: any; // last none error (if any)
}

export interface AppStorePartialState {
  readonly [APPSTORE_FEATURE_KEY]: AppStoreState;
}

export const initialState: AppStoreState = {
  list: [],
  loaded: false
};

export function appStoreReducer(
  state: AppStoreState = initialState,
  action: AppStoreAction
): AppStoreState {
  switch (action.type) {
    case AppStoreActionTypes.AppStoreLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
