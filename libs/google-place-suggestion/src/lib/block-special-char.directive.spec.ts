
import { BlockSpecialCharDirective } from './block-special-char.directive';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GooglePlaceSuggestionComponent } from './google-place-suggestion/google-place-suggestion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
describe('Directive: HoverFocus', () => {

    let component: GooglePlaceSuggestionComponent;
    let fixture;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
            declarations: [GooglePlaceSuggestionComponent, BlockSpecialCharDirective]
        });
        fixture = TestBed.createComponent(GooglePlaceSuggestionComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.directive(BlockSpecialCharDirective));
        //inputEl = fixture.debugElement.query(By.tagName('#myInput'));
    });


    it('should prevent keypress event', async(() => {
        spyOn(component, 'onKeyPress').and.callThrough();
        component.onKeyPress();
        const event = new KeyboardEvent('keypress', {
            'key': '@',
            cancelable: true
        });
        inputEl.nativeElement.dispatchEvent(event);
        expect(event.defaultPrevented).toBeTruthy();
        expect(component.onKeyPress).toHaveBeenCalled();
    }));

    it('should not prevent keypress event', async(() => {
        spyOn(component, 'onKeyPress').and.callThrough();
        component.onKeyPress();
        const event = new KeyboardEvent('keypress', {
            'key': '5',
            cancelable: true
        });
        inputEl.nativeElement.dispatchEvent(event);
        expect(event.defaultPrevented).toBeFalsy();
        expect(component.onKeyPress).toHaveBeenCalled();
    }));
    it('should prevent copypaste for input field', async(() => {
        const event = new KeyboardEvent('paste', {
            cancelable: true
        });
        inputEl.nativeElement.dispatchEvent(event);
        expect(event.defaultPrevented).toBeTruthy();
    }));
});
