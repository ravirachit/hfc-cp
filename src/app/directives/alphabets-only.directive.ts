import { Directive, HostListener, Input } from '@angular/core';
import { regExConstant } from 'src/app/constants/regExConstant';

@Directive({
  selector: '[alphabetsOnly]'
})
export class AlphabetsOnlyDirective {
  //alphabets allowed in text box
  
  @Input() isAlphaNumeric: boolean;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(regExConstant.alphabetsOnly).test(event.key);
  }
  constructor() { }

}
