import { async, TestBed } from '@angular/core/testing';
import { CiAssetmanagementModule } from './ci-assetmanagement.module';

describe('CiAssetmanagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CiAssetmanagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CiAssetmanagementModule).toBeDefined();
  });
});
