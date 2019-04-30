import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import {
  DEFAULT_TIMEOUT,
  TimeoutInterceptor,
  defaultTimeout
} from './timeout.interceptor';
import { HeadersInterceptor } from './header.interceptor';


@NgModule({
  imports: [CommonModule],
  declarations: [],
  // exports: [TimeoutInterceptor, ErrorInterceptor],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: defaultTimeout, multi: true }
  ]
})
export class HTTPInterceptorModule {}
