import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';



export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const defaultTimeout = 30000;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
    constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeoutVal) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _timeout = Number(req.headers.get('timeout')) || this.defaultTimeoutVal;
        return next.handle(req).pipe(timeout(_timeout));
    }
}
