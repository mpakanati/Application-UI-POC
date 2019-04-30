import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Style } from  '@cc/ui-core';

import { MenuPositionX } from '@angular/material/menu';
import * as moment from 'moment';

import {
  LoadSite,
  DeleteSite,
  ResetFlags,
  AddLocationDetails,
  UpdateGeofence,
  NoSiteLoaded
} from '../+state/site-management.actions';
import { SiteState } from '../+state/site-management.reducer';
import * as stateSelector from '../+state/site-management.selectors';
import { isEmpty } from 'lodash';

import { Router } from '@angular/router';
import { Site, SiteTiles, SiteMenuEvent,SiteMenuOption } from '../models/sitemanagement.model';
import { SiteManagementService, WizardSteps } from '../site-management.service';
import { SITE_PARAMS } from '../site-management.config';

@Component({
  selector: 'cc-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @Input() siteOptions = [];
  @Output() menuClick = new EventEmitter<SiteMenuEvent>();
  showNoSiteCard: boolean;
  sites: Array<Site> = [];
  isSiteAvailable: boolean = false;
  position: MenuPositionX = 'before';
  cardStyle: Style = {
    'min-height': 'auto',
    'height': '12em'
  };
  cardBodyStyle:Style ={
    'min-height': 'auto',
    'height': '12em'
  }
  tileStyle: Style = {
    'padding': '0 1em'

  };
  queryParam = {
    offset: 0,
    limit: 250
  };
  showDeleteBox: boolean = false;
  isAssociated: boolean = true;
  confirmationMessage: string;
  siteId: number;
  showCancel: boolean;
  siteTiles: Array<SiteTiles> = [];
  constructor(
    private store: Store<SiteState>,
   //private appStore: Store<AppState>,
    //private toasterStore: Store<SharedLibState>,
    private router: Router,
    public wizardService: SiteManagementService
  ) { }

  ngOnInit() {

    this.store.dispatch(new LoadSite(''));
    this.store.select(stateSelector.site).subscribe(res => {
      if (res && res.length) {
        this.store.dispatch(new NoSiteLoaded(false));
        this.isSiteAvailable = true;
        this.sites = res;
        this.setJobsitesTiles();
      }
    });

    this.store.select(stateSelector.getNoSiteLoaded).subscribe(res => {
      this.showNoSiteCard = res;
    });

    this.store.select(stateSelector.getSiteLoadFailed).subscribe(res=> {
      if(res !== '') {
      // const obj: ApiStatus = {
      //   status: 500,
      //   message: 'Please try after sometime',
      //   showToast: true,
      //   color: 'yellow'
      // };
      //this.toasterStore.dispatch(new UpdateApiStatus(obj));
    }
    });
  }

  setJobsitesTiles() {
    this.siteTiles = this.sites.map((site) => {
      return {
        siteId: site.id,
        location: site.location,
        kpis: site.kpis,
        poweredBy: site.poweredBy,
        redirectUrl: site.redirectUrl,
        siteName: site.name,
        jobsCount:  site.jobsCount,
        tile1: [
          {
            value: `${site.name}`,
            class: `site_name`
          }
        ],
        tile2: [
          {
            value: `${site.kpis[0].name}`,
            class: `tile2_name`
          },
          {
            value: `${(typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[0].value}` : ''}` : `${site.kpis[0].value}`}`,
            class: `${site.kpis[0].value > 0 ? '' : 'align-content'}, tile2_value`
          }
        ],
        tile3: [
          {
            value: `${site.kpis[1].name}`,
            class: `tile3_name`

          },
          {
            dividers: {
              start: {
                value: (typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[1].value}`: ''}` : `${site.kpis[1].value}`
              },
              end: {
                value: (typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[1].target}`: ''}` : `${site.kpis[1].target}`
              }
            },
            class: `tile3_target`,
            value: (typeof site.jobsCount !== "undefined" ) ? `${(site.jobsCount > 0) ? `${site.kpis[1].value}` : ''}` : null,

          }
        ],
        tile4: [
          {
            value: `${site.kpis[2].name}`,
            class: `tile4_name`
          },
          {
            dividers: {
              start: {
                value: (typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[2].value}`: ''}` : `${site.kpis[2].value}`
              },
              end: {

                value:  (typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[2].target}`: '' }`: `${site.kpis[2].target}`
              }
            },
            class: `tile4_target`,
            value: (typeof site.jobsCount !== "undefined") ? `${(site.jobsCount > 0) ? `${site.kpis[2].value}` : '' }`: null,
          }
        ]
      }
    });
  }

  /*
  * Redirect on card click if URL is configured from Parent application
  */
  onSiteCardClicked(site) {
    if (!site.redirectUrl) {
      if (this.wizardService.config.siteRedirectUrl.siteDetail) {
        this.router.navigate([this.wizardService.config.siteRedirectUrl.siteDetail, site.siteId]);
      }
    } else {
      //redirect url will come from response
      let URL: string;
      if (site.poweredBy.indexOf('Advanced') > -1) {
        const params = this.getSiteParams(site);
        URL = `${site.redirectUrl}viz?VLParam=${params}`;
      } else {
        URL = `${site.redirectUrl}#/site/CATCR/views/${site.siteName}_PitEssentials/PitEssentials?UoM=${SITE_PARAMS.UOM}`;
      }
      window.open(URL, '_blank');
    }
  }

  /**
   * Function to get user preferences and AP site params
   * @param site Selected site
   */

  getSiteParams(site): string {
    const dateFormat: string = SITE_PARAMS.dateFormat;
    const startDate = moment().subtract(90, 'days').format(dateFormat);
    const endDate = moment().format(dateFormat);
    const params = `;;${startDate};${endDate};${SITE_PARAMS.timezone};
                    ${SITE_PARAMS.lang};${SITE_PARAMS.UOM};${SITE_PARAMS.groupId};
                    ${site.siteName}`;
    const encryptedParams = this.wizardService.encryptParams(params);
    return encryptedParams;
  }

  onSiteOptionClicked(siteid: number, option: SiteMenuOption) {
    const site = this.sites.find(_site => _site.id === siteid); //Picking matched object based on ID
    switch (option.id) {
      case 'edit':
        this.editSite(site);
        break;
      case 'delete':
        this.checkToDelete(site.id);
        break;
      case 'view_job_history':
        const _event: SiteMenuEvent = {
          menuOptionId: option.id,
          site: site
        }
        this.menuClick.emit(_event);
    }
  }

  checkToDelete(siteId: number) {
    this.showCancel = true;
    this.confirmationMessage =
      'Are you sure you want to delete the selected Jobsite?';
    this.showDeleteBox = true;
    this.siteId = siteId;
  }

  hideDeleteDialog() {
    this.showDeleteBox = false;
  }

  deleteSite() {
    this.showDeleteBox = false;
    this.store.dispatch(new DeleteSite(this.siteId));
    this.store.select(stateSelector.getDeletedSite).subscribe(res => {
      if (res !== null) {
        // const obj: ApiStatus = {
        //   status: 1,
        //   message: 'Jobsite deleted successfully',
        //   showToast: true,
        //   color: 'yellow'
        // };
        // this.toasterStore.dispatch(new UpdateApiStatus(obj));
        this.store.dispatch(new ResetFlags());
      }
    });

    this.store.select(stateSelector.getFailedDelete).subscribe(res => {
      if (!isEmpty(res) && res.status !== 400) {
        this.showDeleteBox = false;
        // const obj: ApiStatus = {
        //   status: 500,
        //   message: res.status === 0 ? res.statusText : res.error,
        //   showToast: true,
        //   color: 'yellow'
        // };
        // this.toasterStore.dispatch(new UpdateApiStatus(obj));
        this.store.dispatch(new ResetFlags());
      } else if (!isEmpty(res) && res.status === 400) {
        this.showCancel = false;
        this.showDeleteBox = true;
        this.confirmationMessage = 'This site cannot be deleted as jobs are associated with it';
        this.store.dispatch(new ResetFlags());
      }
    });
  }

  editSite(site: Site) {
    const streetAndLocation = site.location.split(',');
    const siteDetails = {
      siteName: site.name,
      street: streetAndLocation[0],
      cityState: `${`${streetAndLocation[1].trim() || ''},${streetAndLocation[2] || ''}`}`
    };
    const geofenceDetails = site.geofence;
    this.router.navigate(['dashboard/editsite', site.id]);
    this.store.dispatch(new AddLocationDetails(siteDetails));
    this.store.dispatch(new UpdateGeofence(geofenceDetails));
  }

  stopPropogation(event) {
    event.stopPropagation();
  }
}
