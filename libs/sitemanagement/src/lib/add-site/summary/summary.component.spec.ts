import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { SummaryComponent } from './summary.component';
import {
  appReducer,
  appInitialState
} from '@cc/utils';
import { DataPersistence } from '@nrwl/nx';
// import { MockStore, TestStoreModule } from '@Testing/testing';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { initialState, JobManagementService } from '@cc/jobmanagement';
import {
  siteReducer,
  initialState as siteInitialState
} from '../../+state/site-management.reducer';
import { WizardSteps } from '../../site-management.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { JobState, jobReducer } from '@Tera/jobmanagement';
import { SiteManagementService } from '../../site-management.service';
import { HttpClientModule } from '@angular/common/http';
import { environmentInitialState, environmentReducer } from "@cc/utils";
import { assetReducer } from '@cc/ci-assetmanagement';
describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  // let store: MockStore<JobState>;
  // const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
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
  const fakeActivatedRoute = {
    data: { subscribe: (fn: (value: Data) => void) => fn({ id: "1", }), },
    params: { subscribe: (fn: (value: Params) => void) => fn({ id: "1", }), }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatChipsModule,
        HttpClientModule,
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
        /* StoreModule.forFeature('jobManagement', jobReducer, {
          initialState: initialState
        }), */
        StoreModule.forFeature('ciassetManagement', assetReducer),
        EffectsModule.forRoot([])
      ],
      declarations: [SummaryComponent],
      providers: [SiteManagementService, DataPersistence/* , { provide: Router, useValue: routerSpy } */, { provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: 'siteConfig', useValue: CONFIG }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call onEditClicked', () => {
    spyOn(component, 'onEditClicked').and.callThrough();
    const label = 'summary';
    component.onEditClicked(label);
    expect(component.onEditClicked).toHaveBeenCalledWith(label);
  });
});
