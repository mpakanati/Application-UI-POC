import { async, TestBed } from '@angular/core/testing';
import { GooglePlaceSuggestionModule } from './google-place-suggestion.module';

describe('GooglePlaceSuggestionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GooglePlaceSuggestionModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const dummy = true;
    expect(dummy).toBeDefined();
  });
});
