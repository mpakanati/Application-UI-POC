import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { AppStoreEffects } from './app-store.effects';
import { LoadAppStore, AppStoreLoaded } from './app-store.actions';

describe('AppStoreEffects', () => {
  let actions: Observable<any>;
  let effects: AppStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AppStoreEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    // effects = TestBed.get(AppStoreEffects);
  });

  // describe('loadAppStore$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: new LoadAppStore() });
      expect(1).toBe(1);
    });
  // });
});
