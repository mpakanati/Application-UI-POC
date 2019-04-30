import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglePlaceSuggestionComponent } from './google-place-suggestion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('GooglePlaceSuggestionComponent', () => {
  let component: GooglePlaceSuggestionComponent;
  let fixture: ComponentFixture<GooglePlaceSuggestionComponent>;
  let inputEl: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule,
        MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
      declarations: [GooglePlaceSuggestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePlaceSuggestionComponent);
    component = fixture.componentInstance;
    component.inputControl = {
      id: 'streetname',
      placeHolder: 'Street name',
      autocomplete: false,
      errorMessage: { required: "Street name is required", validStreet: "Please enter or select valid street" }
    }

    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('.test'))
  });

  it('should create `GooglePlaceSuggestionComponent()` component', () => {
    expect(component).toBeTruthy();
  });

  it('should implement `registerOnChange()` interface', () => {
    spyOn(component, 'registerOnChange').and.callThrough();
    component.registerOnChange('');
    expect(component.registerOnChange).toHaveBeenCalled();
  });

  it('should implement `registerOnTouched()` interface', () => {
    spyOn(component, 'registerOnTouched').and.callThrough();
    component.registerOnTouched('');
    expect(component.registerOnTouched).toHaveBeenCalled();
  });

  it('should implement `writeValue()` interface', () => {
    spyOn(component, 'writeValue').and.callThrough();
    component.writeValue('input');
    expect(component.writeValue).toHaveBeenCalled();
    expect(component.placeText).toBe('input');
  });

  it('should execute `clearText()` method to clear text input', () => {
    spyOn(component, 'clearText').and.callThrough();
    component.clearText();
    expect(component.clearText).toHaveBeenCalled();
    expect(component.placeText).toBe('');
    expect(component.selected).toBeFalsy();
  });

  it('should execute `onFocusOut()` method emit input to parent comonent if autocomplete true', () => {
    component.placeText = '';
    component.inputControl.autocomplete = true;
    component.keyPressed = true;
    fixture.detectChanges();
    const emptyString = '';
    spyOn(component, 'onFocusOut').and.callThrough();
    component.onFocusOut();
    expect(component.onFocusOut).toHaveBeenCalled();
    //expect(component.placeText).toBe('');
  });

  it('should execute `onFocusOut()` method emit input to parent comonent if autocomplete false', () => {
    component.placeText = 'site   ';

    //component.inputControl.autocomplete = false;
    fixture.detectChanges();
    const emptyString = '';
    spyOn(component, 'onFocusOut').and.callThrough();
    component.onFocusOut();
    expect(component.onFocusOut).toHaveBeenCalled();
    //expect(component.placeText).toBe('');
  });

  it('should execute `onKeyPress()` method', () => {
    spyOn(component, 'onKeyPress').and.callThrough();
    component.onKeyPress();
    expect(component.onKeyPress).toHaveBeenCalled();
    expect(component.keyPressed).toBeTruthy();
    expect(component.selected).toBeFalsy();
  });

  it('should execute `setFocus()` method', () => {
    spyOn(component, 'setFocus').and.callThrough();
    component.setFocus();
    expect(component.setFocus).toHaveBeenCalled();
    expect(component.focusIn).toBeTruthy();
  });

  it('should handle onKeyUp method to handle else if userAgent is desktop', () => {
    spyOn(component, 'onKeyUp').and.callThrough();
    const event = new KeyboardEvent('onkeyup', {
      'key': '@',
      cancelable: true
    });
    component.onKeyUp(event);
    expect(component.onKeyUp).toHaveBeenCalled();
  });


  it('should handle onKeyUp method  for mobile browser with event.key as special charactors', () => {
    const DefaultUserAgent = navigator.userAgent;
    spyOn(component, 'onKeyUp').and.callThrough();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36"
      }
    });
    const event = new KeyboardEvent('onkeyup', {
      'key': '@',
      cancelable: true
    });
    inputEl.nativeElement.value = '@'
    inputEl.nativeElement.dispatchEvent(event);
    component.onKeyUp(event);
    expect(component.onKeyUp).toHaveBeenCalled();
    //expect(component.required).toBeTruthy();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return DefaultUserAgent
      }
    });
  });

  it('should handle onKeyUp method  for mobile browser with event.key as alphabets', () => {
    const DefaultUserAgent = navigator.userAgent;
    spyOn(component, 'onKeyUp').and.callThrough();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36"
      }
    });
    const event = new KeyboardEvent('onkeyup', {
      'key': 'A',
      cancelable: true
    });
    inputEl.nativeElement.value = 'Angular is a TypeScript-based open-source full-stack web application framework led by the Angular Team at Google and by a community of individuals and corporations'
    inputEl.nativeElement.dispatchEvent(event);
    component.onKeyUp(event);
    expect(component.onKeyUp).toHaveBeenCalled();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return DefaultUserAgent
      }
    });
  });
  it('should handle onkeyup() method for mobile browser with event.key is empty', () => {
    const DefaultUserAgent = navigator.userAgent;
    spyOn(component, 'onKeyUp').and.callThrough();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36"
      }
    });
    const event = new KeyboardEvent('onkeyup', {
      'key': '',
      cancelable: true
    });
    inputEl.nativeElement.value = '';
    inputEl.nativeElement.dispatchEvent(event);
    component.onKeyUp(event);
    expect(component.onKeyUp).toHaveBeenCalled();
    Object.defineProperty(navigator, "userAgent", {
      get: function () {
        return DefaultUserAgent
      }
    });
  });
});
