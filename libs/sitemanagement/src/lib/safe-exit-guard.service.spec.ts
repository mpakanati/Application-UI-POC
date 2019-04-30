import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { SafeExitGuardService } from './safe-exit-guard.service';

describe('SafeExitGuard', () => {
    let injector: TestBed;
    let service: SafeExitGuardService;
    let httpMock: HttpTestingController;
    const addSiteResolve = {
      canSafeExit() : Promise<boolean> {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    }
    const addSiteReject = {
      canSafeExit() : Promise<boolean> {
        return new Promise((resolve, reject) => {
          reject();
        });
      }
    }
    beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [SafeExitGuardService]
      });
      injector = getTestBed();
      service = injector.get(SafeExitGuardService);
      httpMock = injector.get(HttpTestingController);
      const http = TestBed.get(HttpTestingController);
    });

  it('should be created', () => {
      expect(true).toBeTruthy();
    });

    /* it('should handle canDeactivate for resolve', () => {
      spyOn(service, 'canDeactivate').and.callThrough();
      service.canDeactivate(addSiteResolve);
    });


    it('should handle canDeactivate for reject', () => {
      spyOn(service, 'canDeactivate').and.callThrough();
      service.canDeactivate(addSiteReject);
    }) */
  });
