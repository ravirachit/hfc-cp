import { Directive, HostListener, Input } from '@angular/core';
import { regExConstant } from 'src/app/constants/regExConstant';

@Directive({
  selector: '[alphabetNumericOnly]'
})
export class AlphabetNumericOnlyDirective {
  //alphanumeric allowed in text box
  
  @Input() isAlphaNumeric: boolean;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
  return new RegExp(regExConstant.stringsAlphaNumeric).test(event.key);
  }
  constructor() { }

}
