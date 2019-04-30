import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlockSpecialChar]'
})
export class BlockSpecialCharDirective {
  regexStr = '^[a-zA-Z0-9_., ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event'])
  blockPaste(event: KeyboardEvent) {
    event.preventDefault();
  }
}
