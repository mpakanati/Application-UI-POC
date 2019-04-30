import { async, TestBed } from '@angular/core/testing';
import { SharedLibModule } from './shared-lib.module';

describe('SharedLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedLibModule).toBeDefined();
  });
});
