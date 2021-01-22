import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-check-offer',
  templateUrl: './check-offer.component.html',
  styleUrls: ['./check-offer.component.css']
})
export class CheckOfferComponent implements OnInit {
  value1 = 250000;value2 = 120;value3 = 8.5;
  options1: Options = {
    floor: 10000,
    ceil: 500000,
    step: 5000,
    translate: (value: any, label: LabelType): string => {
      let sValue = value;
      sValue=sValue.toString();
      let lastThree = sValue.substring(sValue.length-3);
      let otherNumbers = sValue.substring(0,sValue.length-3);
      if(otherNumbers != '')
          lastThree = ',' + lastThree;
      let convertedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      switch (label) {
        case LabelType.Low:
          return '₹' + convertedValue;
        case LabelType.High:
          return '₹' + convertedValue;
        default:
          return '₹' + convertedValue;
      }
    }
  };
  options2: Options = {
    floor: 12,
    ceil: 240,
    step: 12,
    translate: (value: any, label: LabelType): string => {
      let sValue = value;
      sValue=sValue.toString();
      let lastThree = sValue.substring(sValue.length-3);
      let otherNumbers = sValue.substring(0,sValue.length-3);
      if(otherNumbers != '')
          lastThree = ',' + lastThree;
      let convertedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      switch (label) {
        case LabelType.Low:
          return convertedValue +' months';
        case LabelType.High:
          return 'Months: ' + convertedValue;
        default:
          return 'Months: ' + convertedValue;
      }
    }
  };
  options3: Options = {
    floor: 1.5,
    ceil: 18.5,
    step: .5,
    translate: (value: any, label: LabelType): string => {
      let sValue = value;
      sValue=sValue.toString();
      switch (label) {
        case LabelType.Low:
          return value +'%';
          case LabelType.High:
            return 'Interest: ' + value + '%';
          default:
            return 'Interest: ' + value + '%';
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
