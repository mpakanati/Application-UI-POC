import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SiteManagementService, WizardSteps } from '../site-management.service';
import { SiteState } from '../+state/site-management.reducer';
import { SiteManagementMockData } from '../site-management.mockdata';
import { ResetLocationDetails, CreateSite, CreateSuccess } from '../+state/site-management.actions';
// import { CardModule } from '@Tera/widgets/card';
import { appReducer, appInitialState } from '@cc/utils';
import { HttpClientModule } from '@angular/common/http';
// import { MockStore, TestStoreModule } from '@Testing/testing';
import {
  siteReducer,
  initialState as siteInitialState
} from '../+state/site-management.reducer';
import { DataPersistence } from '@nrwl/nx';
// import { SharedLibState } from '@Tera/shared-lib';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { environmentInitialState, environmentReducer } from "@cc/utils";
import { RouterTestingModule } from '@angular/router/testing';
import { siteManagementRoutes } from '../site-management.routing';
import { AddSiteComponent } from '../add-site/add-site.component';
import { Actions } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { SiteManagementModule, WizardSteps } from '@Tera/sitemanagement';
// import { SharedLibEffects } from '@Tera/shared-lib';
import { NxModule } from '@nrwl/nx';
import * as siteStateSelector from '../+state/site-management.selectors';
import { By } from '@angular/platform-browser';
import { assetReducer, initialState as assetInitialState, ResetAssets } from '@cc/ci-assetmanagement';
import { CreateFailed, EditSuccess, EditSite, EditFailed, AddLocationDetails } from '../+state/site-management.actions';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { UpdateApiStatus } from '@Tera/shared-lib';
export class TestActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

/* class MockService {
  getAssets = jasmine.createSpy('getAssets');
  getSites = jasmine.createSpy('getSites');
} */

describe('AddSiteComponent', () => {
  let component: AddSiteComponent;
  let fixture: ComponentFixture<AddSiteComponent>;
  let store: Store<any>;
  // let siteStore: MockStore<SiteState>;
  let loc: Location;
  // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const fakeActivatedRoute = {
    data: { subscribe: (fn: (value: Data) => void) => fn({ id: "1", }), },
    params: { subscribe: (fn: (value: Params) => void) => fn({ id: "1", }), }
  } as ActivatedRoute;
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
          // TestStoreModule,
          HttpClientModule,
          FormsModule,
          ReactiveFormsModule,
          // CardModule,
          RouterTestingModule,
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
          }),
          StoreModule.forFeature('ciassetManagement', assetReducer, {
            initialState: assetInitialState
          }),
          EffectsModule.forRoot([]),
          // EffectsModule.forFeature([SharedLibEffects]),
          NxModule.forRoot()
        ],
        declarations: [AddSiteComponent],
        providers: [SiteManagementService, DataPersistence/* , { provide: Router, useValue: routerSpy } */, { provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: 'siteConfig', useValue: CONFIG }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      store = TestBed.get(Store);
      //spyOn(store, 'dispatch').and.callThrough();
    })
  );

  beforeEach(() => {
    // loc = jasmine.createSpyObj("Location", ["back"]);
    fixture = TestBed.createComponent(AddSiteComponent);
    component = fixture.componentInstance;
    component.setLocationForm = component._formBuilder.group({
      'sitename': new FormControl('',
        { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(16)] }),
      'formCtrlStreet': new FormControl('',
        { validators: [Validators.required] }),
      'formCtrlCityState': new FormControl('',
        { validators: [Validators.required] })
    }, { updateOn: 'blur' });
  });

  function updateLocationForm(sitename?, formCtrlStreet?, formCtrlCityState?) {
    component.setLocationForm.controls['sitename'].setValue(sitename);
  }

  it('should create AddSiteComponent', () => {
    expect(component).toBeTruthy();
  });

  /* it('should execute focusout', () => {
    updateLocationForm('   ');
    //spyOn(component, 'focusout').and.callThrough();
    component.focusout();
    expect(component.focusout).toHaveBeenCalled();
    expect(component.namefocusOut).toBeTruthy();
  }); */
  /* it('should execute focusout', () => {
    updateLocationForm('sitename');
    //spyOn(component, 'focusout').and.callThrough();
    component.focusout();
    expect(component.focusout).toHaveBeenCalled();
    expect(component.namefocusOut).toBeTruthy();
  }); */

  it('should handle ngOnInit Method', () => {
    component.ngOnInit();
    expect(component.linear).toBeDefined();
    store.select(siteStateSelector.locationDetails).subscribe((res) => {
      updateLocationForm(res.siteName);
      expect(component.setLocationForm.controls.sitename.value).toEqual(res.siteName);
      expect(component.street).toEqual(res.street);
      expect(component.cityState).toEqual(res.cityState);
    })
  });

  /* it('should execute `focus()` method ', () => {
    //spyOn(component, 'focus').and.callThrough();
    component.focus();
    expect(component.focus).toHaveBeenCalled();
    expect(component.namefocusOut).toBeFalsy();
  }); */


  it('should execute `resetStates()` method ', () => {
    //spyOn(component, 'resetStates').and.callThrough();
    component.resetStates();
    store.dispatch(new ResetLocationDetails(
      {
        siteName: "",
        street: "",
        cityState: ""
      }
    ));
    store.dispatch(new ResetAssets());
  });

  /* it('should execute `postSite()` method ', () => {
    //spyOn(component, 'postSite').and.callThrough();
    //spyOn(component, 'onNavigationBackClick').and.callThrough();
    const postObj = {
      "siteId": '12',
      "siteName": 'Zonw1',
      "makeSerialNumber": ['g62u2u'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Bharath Univ'
      }
    };
    const response = 'Site Created successfully';
    component.postSite(postObj);

    store.dispatch(new CreateSite(postObj));
    store.dispatch(new CreateSuccess(response))
    store.select(siteStateSelector.getCreateSite).subscribe((res) => {

      expect(component.onNavigationBackClick).toHaveBeenCalled();
      store.dispatch(new ResetLocationDetails(
        {
          siteName: "",
          street: "",
          cityState: ""
        }
      ));
    });

  }); */

  it('should execute `postSite()` method with post site failed', () => {
    //spyOn(component, 'postSite').and.callThrough();
    const postObj = {
      "siteId": '12',
      "siteName": 'Zonw1',
      "makeSerialNumber": ['g62u2u'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Bharath Univ'
      }
    };
    const obj = {
      status: 500,
      message: 'An error occured',
      showToast: true
    }
    const response = 'Site name already exists';
    component.postSite(postObj);
    store.dispatch(new CreateSite(postObj));
    store.dispatch(new CreateFailed(response))
    /* store.select(siteStateSelector.getCreateFailed).subscribe((res) => {
      store.dispatch(new UpdateApiStatus(obj));
    });
 */
  });

  /* it('should execute `editSite()` method ', () => {
    // spyOn(component, 'editSite').and.callThrough();
    // spyOn(component, 'onNavigationBackClick').and.callThrough();
    const postObj = {
      "siteId": '12',
      "siteName": 'Zonw1',
      "makeSerialNumber": ['g62u2u'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Bharath Univ'
      }
    };
    const response = 'Site Updated successfully';
    component.editSite(postObj);
    store.dispatch(new EditSite(postObj));
    store.dispatch(new EditSuccess(response))
    store.select(siteStateSelector.getEditedSite).subscribe((res) => {
      expect(component.onNavigationBackClick).toHaveBeenCalled();
      store.dispatch(new ResetLocationDetails(
        {
          siteName: "",
          street: "",
          cityState: ""
        }
      ));
      store.dispatch(new ResetAssets());
    });
  }); */

  it('should execute `editSite()` method with failed response', () => {
    // spyOn(component, 'editSite').and.callThrough();
    // spyOn(component, 'onNavigationBackClick').and.callThrough();
    const postObj = {
      "siteId": '12',
      "siteName": 'Zonw1',
      "makeSerialNumber": ['g62u2u'],
      "location": {
        "cityState": 'Chennai',
        "streetName": 'Bharath Univ'
      }
    };
    const obj = {
      status: 500,
      message: 'An error occured',
      showToast: true
    }
    const response = 'Site name exists';
    component.editSite(postObj);
    store.dispatch(new EditSite(postObj));
    store.dispatch(new EditFailed(response))
    /* store.select(siteStateSelector.getEditedSiteFailed).subscribe((res) => {
      store.dispatch(new UpdateApiStatus(obj));
    }); */
  });

  it('should handle setAssignedAsset', () => {
    const assignedAsset = {
      make: 'CAT 777',
      serialNumber: '2T67YUI'
    }
    // component.setAssignedAsset(assignedAsset);
    expect(this.assignedAssets).toEqual(this.assignedAsset);
  });

  /* it('should execute onConfirmYes method', () => {
    spyOn(component, 'onConfirmYes').and.callThrough();
    component.onConfirmYes();
    component.loadNavigation.subscribe((res) => {
      expect(res).toBeTruthy();
    })
  });


  it('should execute onConfirmNo method', () => {
    spyOn(component, 'onConfirmNo').and.callThrough();
    component.onConfirmNo();
    expect(component.showExitPopup).toBeFalsy();
    component.loadNavigation.subscribe((res) => {
      expect(res).toBeFalsy();
    })
  }) */

  it('should handle canSafeExit method with resolve true', () => {
    // component.showExitPopup = true;
    //spyOn(component, 'canSafeExit').and.callThrough();
    component.canSafeExit();
    expect(true).toBeTruthy();
  });


  /* it('should handle canSafeExit method  with subscribe call', () => {
    spyOn(component, 'resetStates');
    component.showExitPopup = false;
    spyOn(component, 'canSafeExit').and.callThrough();
    component.canSafeExit();
    component.loadNavigation.next(true);
    component.loadNavigation.subscribe(res => {
      expect(component.resetStates).toHaveBeenCalled();
    })
  });

  it('should handle canSafeExit method  with subscribe call', () => {
    spyOn(component, 'resetStates');
    component.showExitPopup = false;
    spyOn(component, 'canSafeExit').and.callThrough();
    component.canSafeExit();
    component.loadNavigation.next(false);
    expect(component.showExitPopup).toBeTruthy();
  }); */

  it('should handle selectionChange method', () => {
    const events = {
      previouslySelectedStep: {
        label: 'SET LOCATION'
      },
      selectedStep: 'SUMMARY'
    };
    const stepper = {
      _steps: {
        last: {
          label: 'SUMMARY'
        }
      }
    }
    const locationDetails = {
      siteName: 'Zone1',
      street: 'Nager',
      cityState: 'Chennai'
    }
    // spyOn(component, 'selectionChange').and.callThrough();
    updateLocationForm(locationDetails.siteName, locationDetails.cityState, locationDetails.street);
    component.selectionChange(events, stepper);
    store.dispatch(new AddLocationDetails(locationDetails));
    expect(component.forwardBtnText).toEqual('Next');
  });

  it('should handle selectionChange method assign assets', () => {
    const events = {
      previouslySelectedStep: {
        label: 'ASSIGN ASSETS'
      },
      selectedStep: {
        label: 'SUMMARY'
      }
    };
    const stepper = {
      _steps: {
        last: {
          label: 'SUMMARY'
        }
      }
    }
    const locationDetails = {
      siteName: 'Zone1',
      street: 'Nager',
      cityState: 'Chennai'
    }
    //spyOn(component, 'selectionChange').and.callThrough();
    updateLocationForm(locationDetails.siteName, locationDetails.cityState, locationDetails.street);
    component.selectionChange(events, stepper);
    expect(component.forwardBtnText).toEqual('Finish');
  });

 /*  it('should handle onAddressFound method', () => {
    component.street = 'Ram Nagar';
    component.cityState = 'Madurai';
    const addressDetails = {
      city: 'Chennai',
      state: 'Tamil nadu',
      street: 'Ram nagar'
    }
    spyOn(component, 'onAddressFound').and.callThrough();
    component.onAddressFound(addressDetails);
    expect(component.street).toEqual('Ram Nagar');
    expect(component.cityState).toEqual('Madurai');
  }); */

  it('should handle onAddressFound method empty string', () => {
    component.street = '';
    component.cityState = '';
    const addressDetails = {
      city: 'Chennai',
      state: 'Tamil nadu',
      street: 'Ram nagar'
    }
    //spyOn(component, 'onAddressFound').and.callThrough();
    component.onAddressFound(addressDetails);
    expect(component.street).toEqual(addressDetails.street);
    expect(component.cityState).toEqual(addressDetails.city + ', ' + addressDetails.state);
  });

  /* it('should handle isSiteNameExists method', () => {
    component.siteId = 10;
    spyOn(component, 'isSiteNameExists').and.callThrough();
    component.isSiteNameExists();

    expect(component.namefocusOut).toBeTruthy();
    component.setLocationForm.get('sitename').valueChanges.pipe(debounceTime(400)).subscribe(res => {
      expect(component.siteExist).toBeDefined();
    });
    component.setLocationForm.controls['sitename'].setValue('Xone 1');
  }); */

  // it('should execute `selectionChange()` method ', () => {
  //   const event = {
  //     previouslySelectedStep : {
  //       label : 'SET LOCATION'
  //     }
  //   }
  //   const locationDetails = {
  //     siteName: 'Zone',
  //     street: 'Bharath University',
  //     cityState: 'Chennai, Tamil Nadu'
  //   }
  //   store.dispatch(new AddLocationDetails(locationDetails));
  //   spyOn(component, 'selectionChange').and.callThrough();
  //   component.selectionChange(event, component.wizardSteps);
  //   store.dispatch(new AddLocationDetails(locationDetails));
  // });

  //   it('should execute `isSiteNameExists()`', () => {
  //     spyOn(component, 'isSiteNameExists').and.callThrough();
  //     const Sname = 'sitename';
  //     //store.dispatch(new LoadSite(queryParam));
  //     component.isSiteNameExists();
  //     expect(component.namefocusOut).toBeTruthy()
  //       store.select(siteStateSelector.site).subscribe((response) => {
  //         expect(component.siteExist).toBeFalsy();
  //   });
  // });

});


class MockRouter {
  events = new Observable(observer => {
    observer.next(true);
    observer.complete();
  });
  url: string;
  navigate(_url: any) {
    this.url = _url[0];
    return this.url;
  }

}
