
import { SiteManagementService, WizardSteps } from '../site-management.service';
import { Component, OnInit, ViewChild, Input, OnDestroy,ElementRef, AfterViewInit, NgZone, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoadSite, AddLocationDetails, CreateSite, ResetFlags, ResetLocationDetails, EditSite, ResetAssignedAssets, UpdateAssignedAssets, UpdateGeofence } from '../+state/site-management.actions';
import { SiteState } from '../+state/site-management.reducer';
import * as stateSelector from '../+state/site-management.selectors';

import { LocationDetails, Site } from '../models/sitemanagement.model';
import { isEmpty } from 'lodash';
import { GooglePlaceSuggestionComponent, Address } from '@cc/google-place-suggestion';
import { AssetState, ResetAssets } from '@cc/ci-assetmanagement';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import {debounceTime} from 'rxjs/operators';
import { ADD_ASSET_CONSTANTS } from '../site-management.config';
@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss']
})
export class AddSiteComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('nameRef') private nameRef: ElementRef;
  @ViewChild('streetRef') private streetRef: GooglePlaceSuggestionComponent;
  @ViewChild('cityRef') private cityRef: GooglePlaceSuggestionComponent;

  @Input() linear: boolean;

  showExitPopup = false;
  canExit = false;
  siteId: number;
  pageTitle = ADD_ASSET_CONSTANTS.CREATE_JOBSITE;
  sites: Site[];
  setLocationForm: FormGroup;
  exitResolver: Subject<any> = new Subject<any>();
  assignedAssets: any = [];
  geofenceDetails = [];
  isAllAssetsAP = false;
  queryParam = {
    offset: 0,
    limit: 250
  };
  groupId: string;
  isNewGroupId = false;
  postObjForSite: any;
  createGroup = false;
  namefocusOut = false;
  siteExist = false;
  street: string;
  cityState: string;
  formCtrlCityState = {
    id: 'citystate',
    placeHolder: 'City and State',
    autocomplete: true,
    errorMessage: {
      required: "City and State are required",
      validCity: "Please enter valid City & State"
    }
  }

  formCtrlStreet = {
    id: 'streetname',
    placeHolder: 'Street name',
    autocomplete: false,
    errorMessage: { required: "Street name is required", validStreet: "Please enter or select valid street" }
  }

  wizardSteps: any;
  forwardBtnText = 'Next';
  currentIndex: number;
  tempAssets: any
  tempLocation: any;
  enableSetLocation: boolean;
  showAssignTagDialog = false;
  isPMAsset = false;
  paddingValue: any;
  sitePanelpaddingValue: any;
  groupsiteName: string;
  groupObj: any;
  siteSubscription: Subscription;
  required = false;
  isMinLength = false;
  /* @HostListener('window:beforeunload', ['$event'])
  onHardReload() {
    return false;
  } */

  constructor(public _location: Location, public zone: NgZone, public _formBuilder: FormBuilder, public siteStore: Store<SiteState>, public assetStore: Store<AssetState>,
    public appStore: Store<any>, public wizardService: SiteManagementService, private route: ActivatedRoute) {
    this.wizardSteps = WizardSteps;

    this.siteSubscription = this.siteStore.select(stateSelector.locationDetails).subscribe((loaction) => {
      this.tempLocation = loaction;
    });
    this.route.params.subscribe(params => {
      this.siteId = Number(params['id']);
      this.pageTitle = !!this.siteId ? ADD_ASSET_CONSTANTS.EDIT_JOBSITE : ADD_ASSET_CONSTANTS.CREATE_JOBSITE;
    });
    const sitesStub = this.siteStore.select(stateSelector.site).subscribe((sites) => {
      this.sites = sites;
      const site = this.sites.find(_site => _site.id === this.siteId); //Picking matched object based on ID
      if (site) {
        this.getSiteDetails(site)
      }
    });
    const assetStub = this.assetStore.select(stateSelector.assignedAssets).subscribe((assets) => {
      this.tempAssets = assets;
      this.assignedAssets = assets;
    });

    this.siteSubscription.add(assetStub);
    this.siteSubscription.add(sitesStub);

  }

  ngOnInit() {

    this.linear = true;
    this.setLocationForm = this._formBuilder.group({
      'sitename': new FormControl('',
        { validators: [Validators.required, Validators.minLength(3)] }),
      'formCtrlStreet': new FormControl('',
        { validators: [Validators.required] }),
      'formCtrlCityState': new FormControl('',
        { validators: [Validators.required] })
    }, { updateOn: 'blur' });

    const locationStub = this.siteStore.select(stateSelector.locationDetails).subscribe(site => {
      this.setLocationForm.get('sitename').setValue(site.siteName);
      this.street = site.street;
      this.cityState = site.cityState;
    });

    this.siteSubscription.add(locationStub);

    /* this.appStore.select((appStore: any) => appStore.app.parsedToken).subscribe(response => {
      const query = `?Ucid=${response.ucid || 'gthraves'}&offset=${
        this.queryParam.offset
        }&limit=${this.queryParam.limit}&isTotalCountRequired=true`; */
      this.siteStore.dispatch(new LoadSite(''));
    // });
    (window.innerWidth < 800) ? this.paddingValue = '0 1.5em' : this.paddingValue = '0 4.5em';
    (window.innerWidth < 800) ? this.sitePanelpaddingValue = '0.5em 1.5em' : this.paddingValue = '0';
    this.subscribeEditSite();
    this.subscribeCreateSite();
    /* this.subscribeGroupIdSuccess();
    this.subscribeGroupIdFailure(); */
  }

  getSiteDetails(site: Site) {
    const streetAndLocation = site.location.split(',');
    const siteDetails = {
      siteName: site.name,
      street: streetAndLocation[0],
      cityState: `${`${streetAndLocation[1].trim() || ''},${streetAndLocation[2] || ''}`}`
    };
    const geofenceDetails = site.geofence;
    this.siteStore.dispatch(new AddLocationDetails(siteDetails));
    this.siteStore.dispatch(new UpdateGeofence(geofenceDetails));
  }

  paddingChange(value: any) {
    this.paddingValue = value.padding;
    const steperElement = document.getElementsByClassName('mat-horizontal-content-container') as HTMLCollectionOf<HTMLElement>;
    (!value.flag) ? steperElement[0].setAttribute("style", "margin-top:-2.2rem;") : steperElement[0].setAttribute("style", "margin-top: 0;");
    (value.flag && window.innerWidth < 800) ? this.sitePanelpaddingValue = '0.5em 1.5em' : this.sitePanelpaddingValue = '0';
  }

  /* istanbul ignore next */
  goForward(stepper: MatStepper) {
    (this.nameRef) ? this.nameRef.nativeElement.focus() : '';
    let canGoForward = true ;//this.wizardService.config.siteWizardSteps[stepper.selectedIndex].optional
    switch (stepper.selected.label) {
      case WizardSteps.setLocation:
        if (this.setLocationForm.valid && !this.siteExist) {
          const locationDetails = {
            siteName: this.setLocationForm.value["sitename"],
            street: this.street,
            cityState: this.cityState
          }
          this.siteStore.dispatch(new AddLocationDetails(locationDetails));
          canGoForward = true;
          this.enableSetLocation = true;
        }
        else {
         (this.street === '' && this.setLocationForm.value["sitename"] !== '' && this.setLocationForm.value["sitename"].length >= 3 && !this.siteExist) ? this.streetRef.setFocus() : '';
          (this.cityState === '' && this.street !== '' && this.setLocationForm.value["sitename"] !== '' && this.setLocationForm.value["sitename"].length >= 3) ? this.cityRef.setFocus() : '';
        }
        break;
      case WizardSteps.assignAssets:
        this.assetStore.dispatch(new UpdateAssignedAssets(this.assignedAssets));
        canGoForward = this.checkAssignedAssets(canGoForward, this.assignedAssets, true);
        break;
      case WizardSteps.createGeoFence:
        this.siteStore.dispatch(new UpdateGeofence(this.geofenceDetails));
        canGoForward = true;
        break;
      case WizardSteps.summary:
        const assetData = (this.tempAssets) ? this.tempAssets.map(assets => {
          return `${assets.make}|${assets.serialNumber}`;
        }) : []
        const postObj = {
          "siteId": (this.siteId) ? this.siteId : 0,
          "siteName": this.tempLocation.siteName,
          "makeSerialNumber": assetData,
          "location": {
            "cityState": this.tempLocation.cityState,
            "streetName": this.tempLocation.street
          }
        };
        this.createGroupId(stepper, postObj);
        break;
    }

    if (canGoForward) {
      stepper.selected.completed = true;
      stepper.next();
    }
  }

  checkAssignedAssets(canGoForward: boolean, assignedAssets: any, toast: boolean = false) {
    /* if (!canGoForward) {
      canGoForward = !!assignedAssets && assignedAssets.length > 0;
      if (!canGoForward && toast)
        this.displayToastforErrors(ASSIGNED_ASSET_ERROR);
      else if (this.wizardService.config.siteWizardSteps[this.getAssignAssetIndex()].action.assignTag) {
        let tags: boolean = false;
        tags = this.checkforTags();
        this.isPMAsset = tags;
        canGoForward = canGoForward && tags;
        if (!tags && toast) this.displayToastforErrors(TAG_ERROR);
      }
    } */
    return true; //canGoForward;
  }
  getAssignAssetIndex() {
    const selectedArray = this.wizardService.config.siteWizardSteps.filter((steps) => (steps.label === WizardSteps.assignAssets));
    return this.wizardService.config.siteWizardSteps.indexOf(selectedArray[0]);
  }

  createGroupId(stepper, postObj) {
    this.createGroup = this.wizardService.config.siteWizardSteps[stepper.selectedIndex].action.createGroupId;
    const isAdvanceProductivity = [];
    /* if (this.createGroup) {
      this.tempAssets && this.tempAssets.forEach(assets => {
        if (assets.type && assets.type.indexOf(ASSET_TYPE.ADVANCED_PRODUCTIVITY) > -1) {
          isAdvanceProductivity.push(assets.type);
        }
      });
      if (isAdvanceProductivity.length === this.tempAssets.length) {
        this.isAllAssetsAP = true;
        this.canCreateGroup(postObj)
      } else {
        this.isAllAssetsAP = false;
        this.finishSiteCreate(postObj);
      }
    } else */ //{
      this.finishSiteCreate(postObj);
    //}
  }

  finishSiteCreate(postObj) {
    // this.appendAdditionalParams(postObj);
    this.onNavigationBackClick();
   // (this.siteId) ? this.editSite(postObj) : this.postSite(postObj)
  }

  canCreateGroup(postObj) {
    this.isNewGroupId = true;
    this.postObjForSite = postObj;
    const assetData = (this.tempAssets) ? this.tempAssets.map(assets => {
      return {
        make: assets.make,
        serialNumber: assets.serialNumber,
        operation: "Add"
      };
    }) : []
    const site = this.sites.find(currentSite => currentSite.id === this.siteId);
    if (site) {
      this.groupsiteName = site.name;
      this.groupId = site.groupId;
    }
    this.groupObj = {
      groupId: this.groupId || '',
      group: {
        "name": this.tempLocation.siteName,
        "assets": assetData,
        "sharedWithOrganization": true
      }
    }
    this.groupsiteName === this.tempLocation.siteName ? this.updateCCDSGroup() : this.createCCDSGroup();
  }

  updateCCDSGroup() {
    // this.appStore.dispatch(new EditGroup(this.groupObj));
  }

  createCCDSGroup() {
    // this.appStore.dispatch(new CreateGroup(this.groupObj));
  }

  editSite(postObj) {
    this.appStore.dispatch(new EditSite(postObj));
  }

  private subscribeEditSite() {
    const editedSiteStub = this.siteStore.select(stateSelector.getEditedSite).subscribe((res) => {
      if(res){
        if (res.error) {
          this.onsiteEditError();
        }
        else if (res !== '') {
          this.onsiteEditSuccess();
        }
      }
    });
    this.siteSubscription.add(editedSiteStub);
  }

  onsiteEditError() {
    // const obj: ApiStatus = {
    //   status: 500,
    //   message: 'An error occured',
    //   showToast: true,
    //   color: 'yellow'
    // };
    this.siteStore.dispatch(new ResetFlags());
    // this.toasterStore.dispatch(new UpdateApiStatus(obj));
  }

  onsiteEditSuccess() {
    // const obj: ApiStatus = {
    //   status: 1,
    //   message: 'Jobsite updated successfully',
    //   showToast: true,
    //   color: ''
    // };
    this.canExit = true;
   // this.toasterStore.dispatch(new UpdateApiStatus(obj));
    this.resetStates();
    if (this.isPMAsset) this.postAssetTags();
    this.onNavigationBackClick();
  }

  postSite(postObj) {
    this.appStore.dispatch(new CreateSite(postObj));
  }

  private subscribeCreateSite() {
    const createSuccessStub = this.siteStore.select(stateSelector.getCreateSite).subscribe((res) => {
      if(res){
        if (res.error) {
          this.onSiteCreateError();
        } else if (res !== '') {
          this.onSiteCreateSuccess();
        }
      }

    });
    this.siteSubscription.add(createSuccessStub);
  }

  onSiteCreateSuccess() {
    // const obj: ApiStatus = {
    //   status: 1,
    //   message: 'Jobsite created successfully',
    //   showToast: true,
    //   color: ''
    // };
    this.canExit = true;
  //  this.toasterStore.dispatch(new UpdateApiStatus(obj));
    this.resetStates();
    if (this.isPMAsset) this.postAssetTags();
    this.onNavigationBackClick();
  }

  onSiteCreateError() {
    // const obj: ApiStatus = {
    //   status: 500,
    //   message: 'An error occured',
    //   showToast: true,
    //   color: 'yellow'
    // };
    this.siteStore.dispatch(new ResetFlags());
    //this.toasterStore.dispatch(new UpdateApiStatus(obj));
  }

  onNavigationBackClick() {
    this._location.back();
  }

  popupVisibleChange() {
    if (!this.showExitPopup) {
      this.onConfirmNo();
    }
  }

  onConfirmYes() {
    this.exitResolver.next(true);
  }

  onConfirmNo() {
    this.showExitPopup = false;
    this.exitResolver.next(false);
  }

  canSafeExit(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.canExit) {
        resolve(true);
      }
      this.showExitPopup = true;
      this.exitResolver.subscribe((res) => {
        if (res) {
          this.resetStates();
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  };

  resetStates() {
    this.siteStore.dispatch(new ResetLocationDetails(
      {
        siteName: "",
        street: "",
        cityState: ""
      }
    ));
    this.siteStore.dispatch(new ResetFlags());
    this.assetStore.dispatch(new ResetAssets());
    this.siteStore.dispatch(new ResetAssignedAssets());

  };

  get sitename() { return this.setLocationForm.get('sitename'); }

  focus() {
    this.namefocusOut = false;
    // this.siteExist = false;
  }

  onKeyUp(event) {
    if (!!navigator.userAgent.match(/Android | Mobile/)) {
      const siteName = event.target;
      // siteName.value = (event.target.value.length > 16) ? siteName.value.replace(/[^a-zA-Z ]+ | [^a-zA-Z ]+/g, '') : siteName.value.replace(/[^a-zA-Z ]+/g, '');
      siteName.value = (event.target.value.length > 16) ? siteName.value.slice(0, 16) : siteName.value.replace(/[^a-zA-Z ]+/g, '');
      this.required = (event.target.value.length === 0) ? true : false;
      this.isMinLength = (event.target.value.length < 3 && !this.required) ? true : false;
    }
    else {
    }

    this.namefocusOut = true;
    this.siteExist = false;
    this.setLocationForm.get('sitename').valueChanges.pipe(debounceTime(400))
      .subscribe(siteName => {
        if (siteName.trim().length >= 3) {
          this.siteStore.select(stateSelector.site).subscribe((res) => {
            this.siteExist = (res.find(site => site.name.toUpperCase() === siteName.toUpperCase() && site.id !== this.siteId)) ? true : false;
          });
        }
      });
  }

  setSelectedIndex(label) {
    const selectedArray = this.wizardService.config.siteWizardSteps.filter((steps) => (steps.label === label));
    this.stepper.selectedIndex = this.wizardService.config.siteWizardSteps.indexOf(selectedArray[0]);
  }

  selectionChange(event, stepper) {
    if (WizardSteps.setLocation === event.previouslySelectedStep.label) {
      const locationDetails = {
        siteName: this.setLocationForm.value["sitename"],
        street: this.street,
        cityState: this.cityState
      }
      this.siteStore.dispatch(new AddLocationDetails(locationDetails));
    }
    else if (WizardSteps.assignAssets === event.previouslySelectedStep.label) {
      this.assetStore.dispatch(new UpdateAssignedAssets(this.assignedAssets));

    } else if (WizardSteps.summary === event.selectedStep.label && WizardSteps.createGeoFence === event.previouslySelectedStep.label) {
      this.siteStore.dispatch(new UpdateGeofence(this.geofenceDetails));
    }
    this.forwardBtnText = stepper._steps.last.label === event.selectedStep.label ? 'Finish' : 'Next';
    if (this.wizardService.config.showZones) {
      //this.geofenceRef.resetMapSizeView();
      // if (event.selectedStep.label === WizardSteps.createGeoFence) {
      //   this.geofenceRef.resetForm();
      // }
    }
  }

  setAssignedAsset(assignedAsset) {
    this.assignedAssets = assignedAsset;
  }

  setGeofence(geofence) {
    this.geofenceDetails = JSON.parse(JSON.stringify(geofence));
  }

  onAddressFound(address: Address) {
    this.zone.run(() => {
      this.street = this.street === '' ? address.street : this.street;
      this.cityState = this.cityState === '' ? `${`${address.city}, ${address.state}`}` : this.cityState;
    })

  }

  appendAdditionalParams(postObj) {
    const geofenceStep = this.wizardService.config.siteWizardSteps.find(step => step.label === this.wizardSteps.createGeoFence);
    geofenceStep ? Object.assign(postObj, { "geofence": JSON.stringify(this.geofenceDetails) }) : [];
    this.appStore.select((appStore: any) => appStore.app.app_name).subscribe(() => {
    });
    this.wizardService.config['addAppName'] ? Object.assign(postObj,
      {
        "applicationName": this.isAllAssetsAP ? "AdvancedProductivity" : "PitEssential",
        "effectiveUntilDate": "2019-01-31T12:00:00.112Z"
      }) : [];
  }

  /**
   * Subscribe for Group Id from store
   * On edit flow and create site flow to get group id from store
   * Assign it to postobj with key ccdsgroupid
   * call post Api with group id if Advanced productivity subscription
   */
  subscribeGroupIdSuccess() {
    // const groupCreateSuccessStub = this.siteStore.select(stateSelector.getGroupIdSuccess).subscribe((groupId) => {
    //   if (this.isNewGroupId && groupId) {
    //     this.postObjForSite = JSON.parse(JSON.stringify(this.postObjForSite));
    //     this.postObjForSite.ccdsGroupId = groupId;
    //     this.finishSiteCreate(this.postObjForSite);
    //     this.isNewGroupId = false;
    //   }
    // });
    // this.siteSubscription.add(groupCreateSuccessStub);
  }

  subscribeGroupIdFailure() {
    /* const groupCreateFailureStub = this.siteStore.select(stateSelector.getGroupIdFailed).subscribe((res) => {
      if (!isEmpty(res)) {
        this.groupsiteName === this.tempLocation.siteName ? this.displayToastforErrors(GROUP.GROUP_ERROR_MSG) : this.displayToastforErrors(GROUP.GROUP_ID_ERROR_MSG);
      }
    });
    this.siteSubscription.add(groupCreateFailureStub); */
  }

  focusout() {
    this.namefocusOut = true;
    this.setLocationForm.value["sitename"].trim().length === 0 ? this.setLocationForm.get('sitename').setValue('') : '';
  }
  // To check whether to Assign Tag is needed or not. Enabled only for PM
  showAssignTag(stepper) {
    const step = this.wizardService.config.siteWizardSteps[stepper.selectedIndex];
    return step.label === this.wizardSteps.assignAssets && step.action.assignTag ? true : false;
  }
  // To show Assign Tag DialogBox
  assignTag() {
    if (!!this.assignedAssets && this.assignedAssets.length > 0)
      this.showAssignTagDialog = true;
  }
  // To hide Assign Tag Dialog from ASSET TAG COMPONENT
  hideAssignTagPopup() {
    this.showAssignTagDialog = false;
  }
  // To check whether all assigned asset have atleast one tag assigned
  checkforTags() {
    let notag = false;
    if (!!this.assignedAssets && this.assignedAssets.length > 0)
      this.assignedAssets.map((selectedAsset) => {
        if (!(!!selectedAsset.extensions && selectedAsset.extensions.assetTags.length > 0)) {
          notag = true;
        }
      });
    return !notag;
  }

  //To display Common toast message
  displayToastforErrors(message: string) {
    /* const obj: ApiStatus = {
      status: 500,
      message: message,
      showToast: true,
      color: 'yellow'
    } */
    this.siteStore.dispatch(new ResetFlags());
    // this.toasterStore.dispatch(new UpdateApiStatus(obj));
  }
  //To dispatch the asssigned asset with tags assigned
  setTaggedAsset(assignedAssets) {
    this.assignedAssets = assignedAssets;
    this.assetStore.dispatch(new UpdateAssignedAssets(this.assignedAssets));
  }
  //To post Asset along with tags to MDM Subscription api
  postAssetTags() {
    /* this.tempAssets.map((selectedAsset) => {
      if (selectedAsset.hasOwnProperty("id")) {
        const assetData: AssetMDM = this.formMDMparams(selectedAsset);
        this.assetStore.dispatch(new PostAssetsTag(assetData));
      }
    }); */
  }
  formMDMparams(asset) {
    /* const assetData: AssetMDM = {
      "id": asset.id,
      "make": asset.make,
      "serialNumber": asset.serialNumber,
      "model": asset.model,
      "typeId": asset.typeId,
      "type": asset.type,
      "level": asset.level,
      "origin": asset.origin,
      "organization": asset.organization,
      "organizationType": asset.organizationType,
      "associatedOrganization": asset.associatedOrganization,
      "associatedOrganizationType": asset.associatedOrganizationType,
      "status": asset.status,
      "startTime": asset.startTime,
      "endTime": asset.endTime,
      "cancelReason": asset.cancelReason,
      "assetKey": asset.assetKey,
      "dealerCustomerNumber": asset.dealerCustomerNumber,
      "parent": asset.parent,
      "children": asset.children,
      "self": asset.self,
      "asset": asset.asset,
      "extensions": {
        "assetTags": asset.extensions.assetTags,
        "model": asset.model
      }
    }
    return assetData; */
  }
  ngOnDestroy() {
    this.siteSubscription.unsubscribe();
  }
}
