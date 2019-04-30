import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
//import { EnvironmentState } from "@apps/woa/src/app/+environment-state/environment.reducer";
import { API_ENDPOINTS } from './ci-asstemanagement.config';


@Injectable()
export class CIAssetManagementService {
  env: string;
  API_URL: string;
 
  constructor(private http: HttpClient) {
    // this.store.select((state:any ) => state.environment).subscribe(response => {
    //   this.env = response.env;
    //   this.API_URL = response.app_baseURL;
    // })
  }

  getAssets(queryParams: string): Observable<any> {
    const url = "url";
   // const params = new HttpParams().append('canShowSpinner','true');
    return this.http.get(url);
  }

  postAssets(obj: object): Observable<any> {
     const url = '';
    return this.http.post(url, obj);
  }
  searchAssets(searchParam: string): Observable<any> {
    // const options = {
    //   headers: new HttpHeaders().append('Accept', this.accept),
    //   params: new HttpParams().append('canShowSpinner', 'true')
    // }
   const url = "";
    return this.http.get(url);
  }
}
