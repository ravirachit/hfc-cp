import { NgModule } from "@angular/core";

import { IndianCurrencyPipe } from 'src/app/pipes/indian-currency.pipe';


@NgModule({
  declarations: [
    IndianCurrencyPipe
  ],
  imports: [],
  providers: [IndianCurrencyPipe],
  exports: [
    IndianCurrencyPipe
  ]
})
export class CustomPipeModule {}
