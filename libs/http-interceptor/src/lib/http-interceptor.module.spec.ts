import { async, TestBed } from '@angular/core/testing';
import { HTTPInterceptorModule } from './http-interceptor.module';

describe('HttpInterceptorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HTTPInterceptorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HTTPInterceptorModule).toBeDefined();
  });
});
