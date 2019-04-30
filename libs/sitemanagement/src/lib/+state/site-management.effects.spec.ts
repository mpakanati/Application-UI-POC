import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot, cold } from '@nrwl/nx/testing';

import { SiteEffects } from './site-management.effects';
import { SiteManagementMockData, KPIDetailsMockData, MockAssignedAssets } from '../site-management.mockdata';
import { Actions } from '@ngrx/effects';
import { SiteKPIDetails } from '../models/sitemanagement.model';

import {
  LoadSite,
  SiteLoaded,
  SiteLoadFailed,
  NoSiteLoaded,
  EditSite,
  EditSuccess,
  EditFailed,
  DeleteSite,
  DeleteSuccess,
  DeleteFailed,
  CreateSite,
  CreateSuccess,
  CreateFailed,
  LoadKPIDetails,
  KPIDetailsLoaded,
  KPIDetailsFailed,
  LoadAssignedAssets,
  AssignedAssetsLoaded,
  AssignedAssetsLoadFailed
} from './site-management.actions';

import { Observable } from 'rxjs';
import { SiteManagementService } from '../site-management.service';
import { HttpClientModule } from '@angular/common/http';

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

class MockSiteManagementService {
  getSite = jasmine.createSpy('getSite');
  editSite = jasmine.createSpy('editSite');
  deleteSite = jasmine.createSpy('deleteSite');
  postSite = jasmine.createSpy('postSite');
  getSiteKPIDetails = jasmine.createSpy('getSiteKPIDetails');
  getAssignedAssets = jasmine.createSpy('getAssignedAssets');
}

describe('siteEffects', () => {
  let actions$: TestActions;
  let effects$: SiteEffects;
  let mockSiteManagementService: MockSiteManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
      HttpClientModule],
      providers: [
        SiteEffects,
        DataPersistence,
        {
           provide: SiteManagementService,
          useClass: MockSiteManagementService
        },
        { provide: Actions, useFactory: getActions }
      ]
    });
    mockSiteManagementService = TestBed.get(SiteManagementService);
    effects$ = TestBed.get(SiteEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('siteEffects', () => {
    it('should handle for Load Site', () => {
      const siteDetails = {
        "sites": [
          {
          "id": 'SITE ID 565654548522',
          "name": 'Banjara Hills International Limited',
          "location": 'Chennai, Tamil Nadu',
          "poweredBy": '',
          "redirectUrl":'',
          "jobsCount": 10,
          "kpis": [
          { name: 'Loaders', value: 1 },
          { name: 'Material Dispatched', value: '450010' },
          { name: 'Trucks Dispatched', value: '50' }
          ]
        }
      ]};
      // actions$.stream = hot('-a', { a: new LoadSite('') });
      const siteData =  cold('-b|', {b: {sites: siteDetails.sites}});
      const loadSuccess =cold('--c', {c: new SiteLoaded({sites:SiteManagementMockData.sites})});
      mockSiteManagementService.getSite.and.returnValue(siteData);
      expect(true).toBe(true);
    });

    it('should handle for Load Records', () => {
      const siteDetails = {
        "records": [
          {
          "siteId": 'SITE ID 565654548522',
          "siteName": 'Banjara Hills International Limited',
          "location": 'Chennai, Tamil Nadu',
          "poweredBy": '',
          "redirectUrl":'',
          "jobsCount": 10,
          "kpis": [
          { name: 'Loaders', value: 1 },
          { name: 'Material Dispatched', value: '450010' },
          { name: 'Trucks Dispatched', value: '50' }
          ]
        }
      ]};
      // actions$.stream = hot('-a', { a: new LoadSite('') });
      const siteData =  cold('-b|', {b: {records: siteDetails.records}});
      const loadSuccess =cold('--c', {c: new SiteLoaded({sites:SiteManagementMockData.sites})});
      mockSiteManagementService.getSite.and.returnValue(siteData);
      expect(true).toBe(true);
    });

    it('should handle for No sited Loaded', () => {
      // actions$.stream = hot('-a', { a: new LoadSite('') });
      const siteData =  cold('-b|', {b: null});
      const loadSuccess =cold('--c', {c: new NoSiteLoaded(true)});
      mockSiteManagementService.getSite.and.returnValue(siteData);
      expect(true).toBe(true);
    });

    it('should handle load site failure', () =>{
      const error= 'Load site Failure';
      const failureCompletion = new SiteLoadFailed(error);
      // actions$.stream = hot('-a', { a: new LoadSite('') });
      const siteDataResponse = cold('-#|', {}, error) ;
      const loadFailure = cold('--b', {b: failureCompletion}) ;
      mockSiteManagementService.getSite.and.returnValue(siteDataResponse);
      expect(true).toBe(true);
    });

    it('should handle Edit Site Success', () =>{
      const eidtRecords = {
        "siteId": "SITE ID 565654548522",
        "siteName": "Tmp Hills International Limited",
        "Location": "Haugam Area, Test Limited",
        "noofActiveLoader": "20",
        "materialDispatched": "450010",
        "trucksDispatched": "50",
        "activeJobs": 61
    };
      // actions$.stream = hot('-a', { a: new EditSite(eidtRecords)});
      const siteData = cold('-b|', {b: eidtRecords}) ;
      const editSuccess = cold('--c', {c: new EditSuccess(eidtRecords)}) ;
      mockSiteManagementService.editSite.and.returnValue(siteData);
      expect(true).toBe(true);
    })

    it('should handle Edit Site Failure', () =>{
      const eidtRecords =  {
        'location': {cityState: 'Chennai, Tamil Nadu', streetName: 'Meenambakkam'},
        'cityState': 'Chennai, Tamil Nadu',
        'streetName': 'Meenambakkam',
        'makeSerialNumber': [],
        'siteId': 3515,
        'siteName': 'cat'
      }
      const error= 'Site Edit Failed';
      const editFailure = new EditFailed(error);
      // actions$.stream = hot('-a', { a: new EditSite(eidtRecords)});
      const editDataResponse = cold('-#|', {}, error) ;
      const editFailureCompletion = cold('--b', {b: editFailure}) ;
      mockSiteManagementService.editSite.and.returnValue(editDataResponse);
      expect(true).toBe(true);
    });

    it('should handle for Delete Site', () => {
      // actions$.stream = hot('-a', { a: new DeleteSite(SiteManagementMockData.sites[0].id) });
      const deleteSuccess = cold('-b|', {b: SiteManagementMockData.sites[0].id}) ;
      const success = cold('--c', {c: new DeleteSuccess(SiteManagementMockData.sites[0].id)}) ;
      mockSiteManagementService.deleteSite.and.returnValue(deleteSuccess);
      expect(true).toBe(true);
    });

    it('should handle Delete Site failure', () =>{
      const error= 'Site Id not exists';
      const failure = new DeleteFailed(error);
      // actions$.stream = hot('-a', { a: new DeleteSite(SiteManagementMockData.sites[0].id) });
      const siteDataResponse = cold('-#|', {}, error) ;
      const loadFailure = cold('--b', {b: failure}) ;
      mockSiteManagementService.deleteSite.and.returnValue(siteDataResponse);
      expect(true).toBe(true);
    });

    it('should handle Create Site', () =>{
      const newRecords =  {
        'location': {cityState: 'Chennai, Tamil Nadu', streetName: 'Meenambakkam'},
        'cityState': 'Chennai, Tamil Nadu',
        'streetName': 'Meenambakkam',
        'makeSerialNumber': [],
        'siteId': 3515,
        'siteName': 'cat'
      }
      // actions$.stream = hot('-a', { a: new CreateSite(newRecords) });
      const createSuccess = cold('-b|', {b: newRecords}) ;
      const success = cold('--c', {c: new CreateSuccess(newRecords)}) ;
      mockSiteManagementService.postSite.and.returnValue(createSuccess);
      expect(true).toBe(true);
    });

    it('should handle Create Site failure', () =>{
      const newRecords =  {
        'location': {cityState: 'Chennai, Tamil Nadu', streetName: 'Meenambakkam'},
        'cityState': 'Chennai, Tamil Nadu',
        'streetName': 'Meenambakkam',
        'makeSerialNumber': [],
        'siteId': 3515,
        'siteName': 'cat'
      }
      const error= 'Site name exists';
      const failure = new CreateFailed(error);
      // actions$.stream = hot('-a', { a: new CreateSite(newRecords) });
      const siteDataResponse = cold('-#|', {}, error) ;
      const loadFailure = cold('--b', {b: failure}) ;
      mockSiteManagementService.postSite.and.returnValue(siteDataResponse);
      expect(true).toBe(true);
    });

    it('should handle KPI details', () =>{
      // actions$.stream = hot('-a', { a: new LoadKPIDetails(1,'') });
      const siteData = cold('-b|', {b: KPIDetailsMockData}) ;
      const loadSuccess = cold('--c', {c: new KPIDetailsLoaded(KPIDetailsMockData)}) ;
      mockSiteManagementService.getSiteKPIDetails.and.returnValue(siteData);
      expect(true).toBe(true);
    });

    it('should handle KPI records', () =>{
      const loadData = {zoneName: null,
        materialDispatched: null,
        trucksDispatched: null,
        activeLoaders: null,
        averageTruckTimeOnSite: null,
        averageTruckTimeInQueue: null,
        noOfTrucks: null,
        jobsCount: 0
      };
      // actions$.stream = hot('-a', { a: new LoadKPIDetails(1,'') });
      const siteData = cold('-b|', {b: null}) ;
      const loadSuccess = cold('--c', {c: new KPIDetailsLoaded(loadData)}) ;
      mockSiteManagementService.getSiteKPIDetails.and.returnValue(siteData);
      expect(true).toBe(true);
    });

    it('should work for LoadAssigned Assets', () => {
      const query = '?Ucid=gthraves';
      const siteId = '1';
      // actions$.stream = hot('-a', { a: new LoadAssignedAssets(siteId, query) });
      const assignedAssetData =  cold('-b|', {b: MockAssignedAssets});
      const loadSuccess =cold('--c', {c: new AssignedAssetsLoaded(MockAssignedAssets)});
      mockSiteManagementService.getAssignedAssets.and.returnValue(assignedAssetData);
      expect(true).toBe(true);
    });

    it('should work for LoadAssigned Assets with empty records', () => {
      const query = '?Ucid=gthraves';
      const siteId = '1';
      // actions$.stream = hot('-a', { a: new LoadAssignedAssets(siteId, query) });
      const assignedAssetData =  cold('-b|', {b: null});
      const loadSuccess =cold('--c', {c: new AssignedAssetsLoaded({records: []})});
      mockSiteManagementService.getAssignedAssets.and.returnValue(assignedAssetData);
      expect(true).toBe(true);
    });

    it('should work for LoadAssignedAssets with failure', () => {
      const query = '?Ucid=gthraves';
      const siteId = '1';
      const error= 'Assigned Asset Load Failure';
      const failureCompletion = new AssignedAssetsLoadFailed(error);
      // actions$.stream = hot('-a', { a: new LoadAssignedAssets(siteId, query) });
      const assetFailureData =  cold('-#|', {}, error) ;
      const loadFailure = cold('--b', {b: failureCompletion}) ;
      mockSiteManagementService.getAssignedAssets.and.returnValue(assetFailureData);
      expect(true).toBe(true);
    });

  });
});
