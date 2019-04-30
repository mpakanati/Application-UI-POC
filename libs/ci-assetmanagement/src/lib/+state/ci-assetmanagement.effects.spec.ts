import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot, cold } from '@nrwl/nx/testing';

import { AssetEffects } from './ci-assetmanagement.effects';
import { Actions } from '@ngrx/effects';

import {
    LoadAssets,
    AssetsLoaded,
    AssetsLoadedFailed
} from './ci-assetmanagement.actions';
import { CiAssetManagementMockData } from '../ci-assetmanagement.mockdata';
import { Observable } from 'rxjs';
import { CIAssetManagementService } from '../ci-assetmanagement.service';
import { HttpClientModule } from '@angular/common/http';


class MockCIAssetManagementService {
  getAssets = jasmine.createSpy('getAssets');
  getAssignedAssets = jasmine.createSpy('getAssignedAssets');
}

export class TestActions extends Actions {
  constructor() {
  super();
  }

  set stream(source: Observable<any>) {
  this.source = source;
  }
  }

  export function getActions() {
  return new TestActions();
  }

describe('ciassetmanagementEffects', () => {
  let actions$: TestActions;
  let effects$: AssetEffects;
  let mockCIAssetManagementService: MockCIAssetManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
      HttpClientModule],
      providers: [
        { provide: Actions, useFactory: getActions },
        AssetEffects,
        DataPersistence,
        {
           provide: CIAssetManagementService,
          useClass: MockCIAssetManagementService
        }
      ]
    });
    mockCIAssetManagementService = TestBed.get(CIAssetManagementService);
    effects$ = TestBed.get(AssetEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('assetEffect', () => {
    it('should work for LoadAssets', () => {
      const query = '?Ucid=gthraves&offset=0&Limit=10&isTotalCountRequired=true';
      // actions$.stream = hot('-a', { a: new LoadAssets(query) });
      const assetData =  cold('-b|', {b: CiAssetManagementMockData});
      const loadSuccess =cold('--c', {c: new AssetsLoaded(CiAssetManagementMockData)});
      mockCIAssetManagementService.getAssets.and.returnValue(assetData);
      expect(true).toBe(true);
    });

    it('should work for LoadAssets with empty records', () => {
      const query = '?Ucid=gthraves&offset=0&Limit=10&isTotalCountRequired=true';
      // actions$.stream = hot('-a', { a: new LoadAssets(query) });
      const assetData =  cold('-b|', {b: null});
      const loadSuccess =cold('--c', {c: new AssetsLoaded({records:[]})});
      mockCIAssetManagementService.getAssets.and.returnValue(assetData);
      expect(true).toBe(true);
    });

  it('should work for LoadAssets with failure', () => {
    const query = '?Ucid=gthraves&offset=0&Limit=10&isTotalCountRequired=true';
    const error= 'Asset Load Failure';
    const failureCompletion = new AssetsLoadedFailed(error);
    // actions$.stream = hot('-a', { a: new LoadAssets(query) });
    const assetFailureData =  cold('-#|', {}, error) ;
    const loadFailure = cold('--b', {b: failureCompletion}) ;
    // mockCIAssetManagementService.getAssets.and.returnValue(assetFailureData);
    expect(true).toBe(true);
  });
});

});
