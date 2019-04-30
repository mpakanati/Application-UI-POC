import { async, TestBed } from '@angular/core/testing';
import { SiteManagementModule } from './sitemanagement.module';

describe('SiteManagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SiteManagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SiteManagementModule).toBeDefined();
  });
});
