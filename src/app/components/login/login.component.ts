import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { CustomStorage } from "src/app/storage/storageKeys";
import { ApiService } from "src/app/api.service";
import { APIConstant } from "src/app/constants/apiConstants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form:FormGroup;
  isLogin:boolean;

  constructor(public _fb:FormBuilder,private router:Router,private apiservice: ApiService,private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
     // Login form group
     this.login_form = this._fb.group({
      mobile_number: ['', Validators.required]
    });
  }
  onVerify(){
    this.isLogin = true;
    if(this.login_form.invalid){
      return;
    }else{
    const verifyNumberPayload = {
      mobileNumber: this.login_form.value.mobile_number,
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
        this.localStorageService.setData(
          CustomStorage.localKeys.phone, this.login_form.value.mobile_number
        );
        this.isLogin = false;
        this.router.navigate(['/verify-otp']);
      },
      error => {
      }
    );
    }
    
  }

}
