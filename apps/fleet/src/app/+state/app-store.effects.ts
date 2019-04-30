import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AppStorePartialState } from './app-store.reducer';
import {
  LoadAppStore,
  AppStoreLoaded,
  AppStoreLoadError,
  AppStoreActionTypes
} from './app-store.actions';

@Injectable()
export class AppStoreEffects {
  @Effect() loadAppStore$ = this.dataPersistence.fetch(
    AppStoreActionTypes.LoadAppStore,
    {
      run: (action: LoadAppStore, state: AppStorePartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new AppStoreLoaded([]);
      },

      onError: (action: LoadAppStore, error) => {
        console.error('Error', error);
        return new AppStoreLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppStorePartialState>
  ) {}
}
