import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { SiteManagementService } from '../site-management.service';

import { SiteComponent } from './site.component';
// import { SiteDetailsComponent } from '../site-details/site-details.component';
import { SiteManagementMockData } from '../site-management.mockdata';
import { SiteLoaded, DeleteSite, ResetFlags, AddLocationDetails, DeleteSuccess, DeleteFailed } from '../+state/site-management.actions';
// import { CardModule } from '@Tera/widgets/card';
import {
  appReducer, appInitialState
} from '@cc/utils';
import { HttpClientModule } from '@angular/common/http';
import {
  siteReducer,
  initialState as siteInitialState
} from '../+state/site-management.reducer';
import { WizardSteps } from '../site-management.service';
import * as stateSelector from '../+state/site-management.selectors';
import { DataPersistence } from '@nrwl/nx';
// import { SharedLibState } from '@Tera/shared-lib';
import { Router } from '@angular/router';
import { environmentInitialState, environmentReducer } from "@cc/utils";
import { RouterTestingModule } from '@angular/router/testing';
import { siteManagementRoutes } from '../site-management.routing';
import { AddSiteComponent } from '../add-site/add-site.component';

describe('SiteManagementComponent', () => {
  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;
  let store: Store<any>;
  // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
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
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatMenuModule,
          HttpClientModule,
          // CardModule,
          EffectsModule,
          RouterTestingModule.withRoutes(siteManagementRoutes),
          StoreModule.forRoot({
            app: appReducer
          },
            {
              initialState: { app: appInitialState }
            }),
          StoreModule.forFeature('siteManagement', siteReducer, {
            initialState: siteInitialState
          }),
          StoreModule.forFeature('environment', environmentReducer, {
            initialState: environmentInitialState
          })
        ],
        declarations: [SiteComponent, AddSiteComponent/* , SiteDetailsComponent */],
        providers: [SiteManagementService,
          DataPersistence, /* { provide: Router, useValue: routerSpy }, */ { provide: 'siteConfig', useValue: CONFIG }],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('get sitemanagement data', () => {
    store.dispatch(new SiteLoaded(SiteManagementMockData))
    expect(component.isSiteAvailable).toBeTruthy();
  });

  it('call on checkToDelete', () => {
      const siteId =  2320
    component.checkToDelete(siteId);
    expect(component.checkToDelete).toBeTruthy();
  });

  it('call on hideDeleteDialog', () => {
    component.hideDeleteDialog();
    expect(component.hideDeleteDialog).toBeTruthy();
  });

  it('call on deleteServiceCall for success', () => {
    component.deleteSite();
    component.siteId = 2323;
    store.dispatch(new SiteLoaded(SiteManagementMockData));
    store.dispatch(new DeleteSite(SiteManagementMockData.sites['siteId']));
    store.dispatch(new DeleteSuccess(SiteManagementMockData.sites['siteId']));
    store.select(stateSelector.getDeletedSite).subscribe(res => {
      expect(component.showDeleteBox).toBeFalsy();
      store.dispatch(new ResetFlags());
    });
    // store.select(stateSelector.getFailedDelete).subscribe(res => {
    //   store.dispatch(new ResetFlags());
    // });
    expect(component.deleteSite).toBeTruthy();
    // toasterStore.dispatch(new UpdateApiStatus(obj));
  });

  it('call on deleteServiceCall for failure', () => {
    component.deleteSite();
    const siteFailed = {
      error: "No sites with site id -5987 and  organizationId-gthraves found",
      status: 500,
      statusText: "Internal Server Error"
    }
    component.siteId = 2323;
    store.dispatch(new SiteLoaded(SiteManagementMockData));
    store.dispatch(new DeleteSite(SiteManagementMockData.sites['siteId']));
    store.dispatch(new DeleteFailed(siteFailed));
    store.select(stateSelector.getFailedDelete).subscribe(res => {
      store.dispatch(new ResetFlags());
    });
    // toasterStore.dispatch(new UpdateApiStatus(obj));
  });

  it('call on deleteServiceCall for failure for status 400', () => {
    component.deleteSite();
    const siteFailed = {
      error: "No Data found",
      status: 400,
      statusText: "Internal Server Error"
    }
    component.siteId = 2323;
    store.dispatch(new SiteLoaded(SiteManagementMockData));
    store.dispatch(new DeleteSite(SiteManagementMockData.sites['siteId']));
    store.dispatch(new DeleteFailed(siteFailed));
    store.select(stateSelector.getFailedDelete).subscribe(res => {
      expect(component.showCancel).toBeFalsy();
      expect(component.showDeleteBox).toBeTruthy();
      expect(component.confirmationMessage).toEqual('This site cannot be deleted as jobs are associated with it');
      store.dispatch(new ResetFlags());
    });
  });


  it('call on editsite', () => {
    const siteDetails = {
      siteName: "site1",
      street: "chennai",
      cityState: "chennai, tmail nadu"
    }
    const site = {
      id: 12345,
      name: "abc",
      location: "abc, def",
      kpis: [],
      jobsCount: 0
    }
    store.dispatch(new AddLocationDetails(siteDetails))
    component.editSite(site);
  });

  it('call on onSiteCardClicked', () => {
    spyOn( window, 'open' ).and.callFake( function() {
      return true;
  });
   spyOn(component, 'onSiteCardClicked').and.callThrough();
   spyOn(component, 'getSiteParams');
   const site = {
    id: 12345,
    name: "abc",
    location: "abc, def",
    kpis: [],
    jobsCount: 0,
    redirectUrl : 'https://cat-woa-dev-webapp.azurewebsites.net/#/dashboard',
    poweredBy: 'Advanced Productivity'
   }
   const vlmParam = component.getSiteParams(site);
    component.onSiteCardClicked(site);
    expect(window.open).toHaveBeenCalledWith(`https://cat-woa-dev-webapp.azurewebsites.net/#/dashboardviz?VLParam=${vlmParam}`, '_blank');
  });

  it('call on onSiteCardClicked without adavance productivity', () => {
    spyOn( window, 'open' ).and.callFake( function() {
      return true;
  });
   spyOn(component, 'onSiteCardClicked').and.callThrough();
   const site = {
    id: 12345,
    name: "abc",
    location: "abc, def",
    kpis: [],
    jobsCount: 0,
    redirectUrl : 'https://cat-woa-dev-webapp.azurewebsites.net/#/dashboard',
    poweredBy: 'PIT Productivity'
   }
    component.onSiteCardClicked(site);
    expect(window.open).toHaveBeenCalledWith('https://cat-woa-dev-webapp.azurewebsites.net/#/dashboard#/site/CATCR/views/undefined_PitEssentials/PitEssentials?UoM=metric', '_blank');
  });

  /* it('call on onSiteCardClicked with redirect flase', () => {
   spyOn(component, 'onSiteCardClicked').and.callThrough();
   const site = {
    id: 12345,
    name: "abc",
    location: "abc, def",
    kpis: [],
    jobsCount: 0,
    redirectUrl : false,
    poweredBy: 'PIT Productivity'
   }
    component.onSiteCardClicked(site);
   expect(site.id).toEqual(12345);
  }); */

  it('should handle on site option edit click ', () => {
    spyOn(component, 'editSite').and.callThrough();
    const site = {
      id: 1,
      name: 'test1',
      location: 'CA, TIM BRIDGE',
      kpis: [],
      jobsCount: 0
      }
    const option = {
      id: 'edit',
      label: 'Edite',
      routeToPath:'/edit'
    }
    component.sites = [
      {
        id: 1,
        name: 'test1',
        location: 'CA, TIM BRIDGE',
        kpis: [],
        jobsCount: 0
        }
    ]
    component.onSiteOptionClicked(site.id, option);
    expect(component.editSite).toHaveBeenCalledWith(site);
  });

  it('should handle on site option Delete click ', () => {
    spyOn(component, 'checkToDelete').and.callThrough();
    const site = {
      id: 1,
      name: 'test1',
      location: 'CA, TIM BRIDGE',
      kpis: []
      }
    const option = {
      id: 'delete',
      label: 'Delete',
      routeToPath:''
    }
    component.sites = [
      {
        id: 1,
        name: 'test1',
        location: 'CA, TIM BRIDGE',
        kpis: [],
        jobsCount: 0
        }
    ]
    component.onSiteOptionClicked(site.id, option);
    expect(component.checkToDelete).toHaveBeenCalledWith(site.id);
  });

  it('should handle on site option View Job History ', () => {
    spyOn(component.menuClick, 'emit');
    const site = {
      id: 1,
      name: 'test1',
      location: 'CA, TIM BRIDGE',
      kpis: [],
      jobsCount: 0
      }
    const option = {
      id: 'view_job_history',
      label: 'View Job History',
      routeToPath:''
    }
    component.sites = [
      {
        id: 1,
        name: 'test1',
        location: 'CA, TIM BRIDGE',
        kpis: [],
        jobsCount: 0
        }
    ];
    const _event = {
      menuOptionId: option.id,
      site: site
    }
    component.onSiteOptionClicked(site.id, option);
    expect(component.menuClick.emit).toHaveBeenCalledWith(_event);
  });

  it('should handle setJobsitesTiles method',() => {
    component.sites =  [{
      id: 1,
      name: 'test1',
      location: 'CA, TIM BRIDGE',
      kpis: [
        {name: "Active Loaders", value: 8, target:0},
        {name: "Material Dispatched", value: 0,  target:0},
        {name: "Truck(s) Dispatched", value: 0,  target:0}
      ],
      jobsCount: 0
      }
    ];
    spyOn(component, 'setJobsitesTiles').and.callThrough();
    component.setJobsitesTiles();
    expect(component.siteTiles).toBeDefined();
  });

  it('should handle setJobsitesTiles method',() => {
    component.sites =  [{
      id: 1,
      name: 'test1',
      location: 'CA, TIM BRIDGE',
      kpis: [
        {name: "Active Loaders", value: 8, target:0},
        {name: "Material Dispatched", value: 0,  target:0},
        {name: "Truck(s) Dispatched", value: 0,  target:0}
      ],
      jobsCount: undefined
      }
    ];
    spyOn(component, 'setJobsitesTiles').and.callThrough();
    component.setJobsitesTiles();
    expect(component.siteTiles).toBeDefined();
  });

});
