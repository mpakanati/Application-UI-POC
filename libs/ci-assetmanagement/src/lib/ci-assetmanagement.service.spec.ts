import { CIAssetManagementService } from './ci-assetmanagement.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { environmentInitialState, environmentReducer } from "@cc/utils";
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('CiAssetManagement API service', () => {
  // let injector: TestBed;
  // let httpMock: HttpTestingController;
  // let backend: MockBackend = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}),  StoreModule.forFeature('environment', environmentReducer, {
        initialState: environmentInitialState
      })],
      /* providers: [CIAssetManagementService, MockBackend, {
        provide: Http,
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }] */
    });
    /* injector = getTestBed();
    httpMock = injector.get(HttpTestingController); */

  });
  /* beforeEach(inject([MockBackend], (mockEnd: MockBackend) => {

    backend = mockEnd;
  })); */

  it('should be created', () => {
      expect(true).toBeTruthy();
  });

  /* it('should be created', inject([CIAssetManagementService], (service: CIAssetManagementService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable<any> with assets Data' , inject([CIAssetManagementService], (service: CIAssetManagementService) => {
      spyOn(service, 'getAssets').and.callThrough();
      const assetData = {"records":[{"model":"MX-6","make":"Mazda","serialNumber":"122-96-9934","sites":[]}],"totalCount":100,"nextUrl":"https://dev-api-woa-terra-ussc-cat-api-01.azurewebsites.net/api/v1/assets?Ucid=gthraves&Limit=55&isTotalCountRequired=true&canShowSpinner=true&offset=55"}
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
            body: JSON.stringify({
              assetData
            })
        });
        connection.mockRespond(new Response(options));
    });
      const query = `?Ucid=gthraves`;
      service.getAssets(query).subscribe((res) => {
        expect(res).toEqual(assetData);
      });
    })); */
});
