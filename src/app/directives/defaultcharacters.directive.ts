import { Directive, HostListener, Input } from '@angular/core';
import { regExConstant } from 'src/app/constants/regExConstant';

@Directive({
    selector: '[specialIsAlphaNumeric]'
})
export class SpecialCharacterDirective {
//characters allowed in text box

    @Input() isAlphaNumeric: boolean;

    @HostListener('keypress', ['$event']) onKeyPress(event) {
        return new RegExp(regExConstant.defaultCharacter).test(event.key);
    }

}
