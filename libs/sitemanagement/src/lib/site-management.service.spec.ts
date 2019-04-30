import { SiteManagementService } from './site-management.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { environmentInitialState, environmentReducer } from "@cc/utils";
import { MockBackend, MockConnection } from '@angular/http/testing';
import { WizardSteps } from './site-management.service';

describe('SiteManagement API service', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let backend: MockBackend = null;
  const CONFIG = {
    'siteWizardSteps': [
      {
        'label': WizardSteps.setLocation,
        'optional': false
      },
      {
        'label': WizardSteps.assignAssets,
        'optional': false
      },
      {
        'label': WizardSteps.summary,
        'optional': false
      }],
    'siteRedirectUrl': {
      'siteDetail': '/dashboard/site-summary',
      'advanceProductivity': '',
      'tabluae': ''
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}),  StoreModule.forFeature('environment', environmentReducer, {
        initialState: environmentInitialState
      })],
      providers: [SiteManagementService, MockBackend, {
        provide: Http,
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }, { provide: 'siteConfig', useValue: CONFIG }]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  beforeEach(inject([MockBackend], (mockEnd: MockBackend) => {

    backend = mockEnd;
}));

  it('should be created', inject([SiteManagementService], (service: SiteManagementService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable<site> with site Data' , inject([SiteManagementService], (service: SiteManagementService) => {
    const query = `?Ucid=gthraves&offset=0&limit=250&isTotalCountRequired=true`;
    spyOn(service, 'getSite').and.callThrough();
    const siteData = {"records":[{"siteId":3365,"siteName":"Barurao","location":"Mitchell, Bukui","activeLoaders":0,"materialDispatched":0,"trucksDispatched":0,"activeJobs":0}],"totalCount":37,"nextUrl":""}
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            siteData
          })
      });
      connection.mockRespond(new Response(options));
  });
    service.getSite(query).subscribe((res) => {
      expect(res).toEqual(siteData);
    });
  }));

  it('should handle delete site response' , inject([SiteManagementService], (service: SiteManagementService) => {
    spyOn(service, 'deleteSite').and.callThrough();
    const siteConfirmation = {"details":"Site deleted successfully"}
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            siteConfirmation
          })
      });
      connection.mockRespond(new Response(options));
  });
  const siteId = '2121';
    service.deleteSite(siteId).subscribe((res) => {
      expect(res).toEqual(siteConfirmation);
    });
  }));

  it('should handle post site response' , inject([SiteManagementService], (service: SiteManagementService) => {
    const postObj = {
      "siteId": '121',
      "siteName": 'Bijara Hills',
      "makeSerialNumber": ['125BTN', '652UUL'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Ram Nagar'
      }
    };
    spyOn(service, 'postSite').and.callThrough();
    const siteConfirmation = {"details":"Site created successfully"}
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            siteConfirmation
          })
      });
      connection.mockRespond(new Response(options));
  });
    service.postSite(postObj).subscribe((res) => {
      expect(res).toEqual(siteConfirmation);
    });
  }));


  it('should handle edit site response' , inject([SiteManagementService], (service: SiteManagementService) => {
    const editObj = {
      "siteId": '121',
      "siteName": 'Bijara Hills',
      "makeSerialNumber": ['125BTN', '652UUL'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Ram Nagar'
      }
    };
    spyOn(service, 'editSite').and.callThrough();
    const siteConfirmation = {"details":"Site updated successfully"}
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            siteConfirmation
          })
      });
      connection.mockRespond(new Response(options));
  });
    service.editSite(editObj.siteId,editObj).subscribe((res) => {
      expect(res).toEqual(siteConfirmation);
    });
  }));

  it('should handle get SiteKPI Details response' , inject([SiteManagementService], (service: SiteManagementService) => {
    const query = `?Ucid='gthraves'&siteId='1121'`;
    const kpiresponse = {
      zoneName: 'Zone1',
      materialDispatched: 1,
      trucksDispatched: 4,
      activeLoaders: 3,
      averageTruckTimeOnSite: 1,
      averageTruckTimeInQueue: 1,
      noOfTrucks: 4
    }
    spyOn(service, 'getSiteKPIDetails').and.callThrough();
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            kpiresponse
          })
      });
      connection.mockRespond(new Response(options));
  });
    service.getSiteKPIDetails(1, query).subscribe((res) => {
      expect(res).toEqual(kpiresponse);
    });
  }));

  it('should handle get Assigned Assets response' , inject([SiteManagementService], (service: SiteManagementService) => {
    const query = `?Ucid=gthraves`;
    const siteId = '12141'
    const assignedAssetsResponse = {"records":['1258TU', '14225TG']};
    spyOn(service, 'getSiteKPIDetails').and.callThrough();
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
          body: JSON.stringify({
            assignedAssetsResponse
          })
      });
      connection.mockRespond(new Response(options));
  });
    service.getAssignedAssets(siteId, query).subscribe((res) => {
      expect(res).toEqual(assignedAssetsResponse);
    });
  }));
});
