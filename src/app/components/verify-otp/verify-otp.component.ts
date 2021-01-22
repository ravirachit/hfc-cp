import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { ApiService } from "src/app/api.service";
import { APIConstant } from "src/app/constants/apiConstants";
import { CustomStorage } from "src/app/storage/storageKeys";
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  verify_otp:FormGroup;
  isResendOTP:boolean;
  enteredOTP:any='';
  isDisabled:boolean;
  resError:any;
  isOTPtimer:boolean = true;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '35px',
      'border-radius': 5,
      'border': '1px solid #1A90F7',
      'font-size': '22px',
      'outline': 'none',
      'margin-right': '10px',
      'margin-left': '0px'
    }
  };
  customerMobile = this.localStorageService.getData(CustomStorage.localKeys.phone);
  counter$: Observable<number>;
  count = 61;

  constructor(public _fb:FormBuilder,private router:Router,private apiservice: ApiService,private localStorageService: LocalStorageService) {
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
    console.log(this.count == 0);
    if(this.count == 0){
      this.isResendOTP = true;
      this.isOTPtimer = false;
    }
   }

  ngOnInit(): void {
     // Verify OTP form group
     this.verify_otp = this._fb.group({
      otp: ['', Validators.required]
    });
  }
  onOtpChange(otp){
    this.enteredOTP = otp;
    if(this.enteredOTP.length == 6){
      this.isDisabled = true;
    }
    if(this.enteredOTP.length<6){
      this.isDisabled = false;
    }
  }
  onVerify(){
    let customerMobile = this.localStorageService.getData(CustomStorage.localKeys.phone);
    const verifyOTPpayload = {
      mobileNumber: customerMobile,
      isVerified: null,
      otpCounter: null,
      otpValue: this.enteredOTP,
      numberVerificationID: null,
      company: {
        companyId: 2,
        companySlug: "DMI_HFC"
      }
    }
    this.apiservice.post(
      APIConstant.VERIFY_OTP,verifyOTPpayload,resObj => {
        console.log("Verify Number res- ", resObj);
        let token = resObj.responseObj.accessToken.token;
        this.localStorageService.setData(
          CustomStorage.localKeys.token, JSON.stringify(token)
        );
        this.router.navigate(['/user-type']);
      },    
      error => {
        console.log("this.resError- ", error.error.responseMsg);
        this.resError = error.error.responseMsg;
      }
    );
  }
  resendOTP(){
    const verifyNumberPayload = {
      mobileNumber: this.customerMobile,
      isVerified: null,
      otpCounter: null,
      otpValue: null,
      numberVerificationID: null,
      company: {
        companyId: 2,
        companySlug: "DMI_HFC"
      }
    }
    this.apiservice.post(
      APIConstant.GENERATE_OTP,verifyNumberPayload,resObj => {
        this.isResendOTP = false;
        this.isOTPtimer = true;
      },
      error => {
      }
    );
  }

}
