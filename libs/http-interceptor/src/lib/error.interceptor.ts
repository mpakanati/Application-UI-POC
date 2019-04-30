import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { finalize, tap, retry } from 'rxjs/operators';
import { Store } from '@ngrx/store';
//import { SharedLibState, ShowAppSpinner, HideAppSpinner, ApiStatus, API_STATUS, UpdateApiStatus } from '@Tera/shared-lib';
import { errorMessage } from './error.messages.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private instanceServiceArray: any = [];
  constructor(private _injector: Injector) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const canShowSpinner = (req) => req.params.has('canShowSpinner');
    const canShow = canShowSpinner(req);
    if (canShow) {
      this.instanceServiceArray.push(req)
      //this.store.dispatch(new ShowAppSpinner());
    }
    return next.handle(req).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          return event.status;
        }
      }, err => {
        // if (err.status === API_STATUS.INTERNAL_SERVER_ERROR) {
        //   // const payload: ApiStatus = {
        //   //   message: errorMessage.commonErrMsg,
        //   //   status: API_STATUS.INTERNAL_SERVER_ERROR,
        //   //   showToast: true
        //   // }
        //   // this.store.dispatch(new UpdateApiStatus(payload));
        // }
        if (err.status === 404) {
          const router = this._injector.get(Router);
        } else if (err.status === 400) {
          const router = this._injector.get(Router);
        } else if (err.status === 401) {
          document.cookie =
            'SSOCookie=; path=/; domain=.cat.com; expires=' +
            new Date(0).toUTCString();
          window.location.reload();
        }
      }),
        finalize(() => {
          this.instanceServiceArray.pop();
          if (canShow && this.instanceServiceArray.length === 0) {
            //this.store.dispatch(new HideAppSpinner());
          }
        })
      )
  }


}
