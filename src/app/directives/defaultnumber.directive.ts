import { Directive, HostListener, Input } from '@angular/core';
import { regExConstant } from 'src/app/constants/regExConstant';

@Directive({
selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

@Input() isAlphaNumeric: boolean;

@HostListener('keypress', ['$event']) onKeyPress(event) {
return new RegExp(regExConstant.defaultNumbers).test(event.key);
}

}