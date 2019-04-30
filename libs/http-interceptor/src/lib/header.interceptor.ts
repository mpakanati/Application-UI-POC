import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    accessToken: string;
    x_application_id: string;
    IGrant: boolean;
    UCID: string;
    groupID:string
    ucidData:string;

    constructor(private store: Store<any>) {
        /* this.store.select((state: any) => state.app).subscribe((res) => {
            this.accessToken = res.userAccessToken;
            this.x_application_id = res.x_application_id;
            this.IGrant = res.isIGrant;
            this.UCID = res.ucidData;
            if(res.ucidData){
                this.groupID=   JSON.stringify(res.ucidData['groupID'])
                this.ucidData  =  res.ucidData['ucid']
            }

        }); */
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({ headers: request.headers.set('Authorization', "Bearer " + this.accessToken) });
        const customHeaders = JSON.stringify({
            'x-application-id': this.x_application_id,
            'x-group-id': this.groupID,
            'x-organization-id' : this.ucidData
        });
        request = request.clone({ headers: request.headers.set('customheaders', customHeaders) });
        //TODO : Add the Group Id For all the requests
        //  request = request.clone({ headers: request.headers.set('x-group-id', "2")});

        if (this.IGrant) {
            request = request.clone({ headers: request.headers.set('x-application-id', this.x_application_id) });
            if(this.UCID && this.UCID !== '') {
                request = request.clone({ headers: request.headers.set('x-organization-id', this.UCID) });
            }
            if(this.groupID){
                request = request.clone({ headers: request.headers.set('x-group-id',  this.groupID) });
            }
            if(this.ucidData){
                request = request.clone({ headers: request.headers.set('x-organization-id', this.ucidData) });
            }
        }

        if (request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        if (request.headers.has('X-Harvester-ApplicationUcid')) {
            request = request.clone({ headers: request.headers.set('X-Harvester-ApplicationUcid', request.headers.get('X-Harvester-ApplicationUcid')) });
        }

        request = request.clone({
                headers: request.headers.set('Accept', 'application/json')
                                        .set('Cache-Control', 'no-cache')
                                        .set('Pragma', 'no-cache')
                                        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
                                        .set('If-Modified-Since', '0')
                                });

        return next.handle(request);
    }
}
