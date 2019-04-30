import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as crypto from 'crypto-js';
import { TERRA_URL_CONFIG, API_ENDPOINTS } from './site-management.config';

@Injectable()
export class SiteManagementService {
  env: string;
  API_URL: string;
  API_TERRA_URL: string;
  terraUrl: string;
  siteApi: Site_URL;
  CCDS_GROUP_URL: string;
  assigned_assets_URL: string;

  constructor(@Inject('siteConfig') public config: SiteConfig, private http: HttpClient, private store: Store<any>) {
    this.store.select((state: any) => state.environment).subscribe(response => {
      this.env = 'dev';
      this.API_URL = "";
      this.API_TERRA_URL = TERRA_URL_CONFIG[this.env];
      this.siteApi = {GET:''};
      this.CCDS_GROUP_URL = "";
      this.assigned_assets_URL = "";
    })
  }

  getSite(queryParams: string): Observable<any> {
    const url = `${this.API_URL}${this.siteApi.GET}${queryParams}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.get(url, { params });
  }
  deleteSite(siteId: string): Observable<any> {
    const url = `${this.API_TERRA_URL}${this.siteApi.DELETE}/${siteId}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.delete(url, { params });
  }
  postSite(Obj: object): Observable<any> {
    const url = `${this.API_TERRA_URL}${this.siteApi.POST}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.post(url, Obj, { params });
  }
  editSite(siteId: string, obj: object): Observable<any> {
    const url = `${this.API_TERRA_URL}${this.siteApi.PUT}/${siteId}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.put(url, obj, { params });
  }

  getSiteKPIDetails(siteId: number, queryParams: string): Observable<any> {
    const url = `${this.API_URL}${API_ENDPOINTS.KPIDetails.replace('{siteId}', siteId.toString())}/${queryParams}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.get(url, { params });
  }

  getAssignedAssets(siteId: string, queryParams: string): Observable<any> {
    const url = `${this.assigned_assets_URL.replace('{siteId}', siteId.toString())}/${queryParams}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.get(url, { params });
  }

  createGroupId(obj: object): Observable<any> {
    const url = this.CCDS_GROUP_URL;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.post(url, obj, { params });
  }

  editGroupId(groupId: string, obj: object): Observable<any> {
    const url = `${this.CCDS_GROUP_URL}/${groupId}`;
    const params = new HttpParams().append('canShowSpinner', 'true');
    return this.http.post(url, obj, { params });
  }

  /**
 * Function to encrypt query params
 * @param params Query params to be encrypted
 */
  encryptParams(params: string): string {
    const key = "$(ktr^!bs";
    const Pass = crypto.enc.Utf8.parse(key.substring(0, 8));
    const iv = crypto.enc.Utf8.parse(key.substring(Pass.length, 8));
    const encryptedMsg = crypto.DES.encrypt(params, Pass, { mode: crypto.mode.CBC, iv: iv }).toString();
    return encryptedMsg;
  }
}

interface SiteConfig {
  siteWizardSteps: Array<WizardStep>;
  siteRedirectUrl: SiteRedirectUrl;
  showZones: boolean
}

interface SiteRedirectUrl {
  siteDetail: string;
  advanceProductivity: string,
  tabluae: string
}

interface WizardStep {
  label: string;
  optional: boolean;
  action?: Actions;
}

interface Actions {
  createGroupId?: boolean;
  assignTag?: boolean;
}

interface Site_URL {
  GET?: string,
  POST?: string,
  PUT?: string,
  DELETE?: string
}

export enum WizardSteps {
  setLocation = 'SET LOCATION',
  assignAssets = 'ASSIGN ASSETS',
  createGeoFence = 'CREATE GEOFENCE',
  step4 = 'STEP 4',
  summary = 'SUMMARY'
}