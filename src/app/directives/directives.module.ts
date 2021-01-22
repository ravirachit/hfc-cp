import { NgModule } from "@angular/core";

import { AlphabetNumericOnlyDirective } from "src/app/directives/alphabet-numeric-only.directive";
import { AlphabetsOnlyDirective } from "src/app/directives/alphabets-only.directive";
import { NumbersOnlyDirective } from "src/app/directives/defaultnumber.directive";
import { SpecialCharacterDirective } from "src/app/directives/defaultcharacters.directive";
import { FocusDirective } from "src/app/directives/focus-element.directive";
import { IndianCurrencyDirective } from "./indian-currency.directive";

@NgModule({
  declarations: [
    AlphabetNumericOnlyDirective,
    AlphabetsOnlyDirective,
    NumbersOnlyDirective,
    SpecialCharacterDirective,
    FocusDirective,
    IndianCurrencyDirective,

  ],
  imports: [],
  providers: [],
  exports: [
    AlphabetNumericOnlyDirective,
    AlphabetsOnlyDirective,
    NumbersOnlyDirective,
    SpecialCharacterDirective,
    FocusDirective,
    IndianCurrencyDirective,
  ]
})
export class DirectivesModule {}
