import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessage } from 'src/app/constants/validationMessage';
import { regExConstant } from 'src/app/constants/regExConstant';
import { ApiService } from 'src/app/api.service';
import { APIConstant } from "src/app/constants/apiConstants";
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { CustomStorage } from "src/app/storage/storageKeys";
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  // thirdStep: FormGroup;
  // loanPurposeTypeData: any = [];
  // loanProductData: any = [];
  // loanType: any = 1;
  // residencyStatus = 73;
  // selectedGender = 1;
  // leadID: any = this.localStorageService.getData(CustomStorage.localKeys.leadID);
  // persoanlDraftData:any = [];
  // personalDraftReqPayload:any;
  // currentTabIndex;
  // currentLeadApplicantNumber:any = this.leadID+new Date().getUTCMilliseconds();
  // leadApplicantNumber:any;
  // questionValue = [
  //   { value: 'true', viewValue: 'Yes' },
  //   { value: 'false', viewValue: 'No' },
  // ]
  constructor(private modalService: NgbModal, private _fb: FormBuilder, private apiservice: ApiService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
     // Third Step form control
    //  this.thirdStep = this._fb.group({
    //   co_first_name: ['', Validators.required],
    //   co_middle_name: [''],
    //   co_last_name: ['', Validators.required],
    //   co_dob: ['', Validators.required],
    //   co_mobile_number: ['', Validators.required],
    //   co_email_id: ['', [Validators.maxLength(100),
    //   Validators.pattern(regExConstant.email)]],
    //   pan_card: ['', [Validators.required, Validators.pattern(regExConstant.panNumber)]],
    //   aadhar_number: ['', [Validators.required, Validators.pattern(regExConstant.uidNumber)]],
    //   addressLine1: ['', Validators.required],
    //   addressLine2: [''],
    //   pincode: ['', Validators.required],
    //   city: ['', Validators.required],
    //   state: ['', Validators.required],
    //   district: ['', Validators.required],
    // });
  }

  // onChangeLoanType(selectedValue) {
  //   this.loanType = selectedValue;
  //   this.loanProductData.forEach(element => {
  //     if (this.loanType == element.productID) {
  //       this.loanPurposeTypeData = element.loanPurposeList;
  //     }
  //   });
  // }
  // onChangeResidencyType(selectedValue) {
  //   this.residencyStatus = Number(selectedValue);
  // }
  // onChangeGender(selectedValue) {
  //   this.selectedGender = selectedValue;
  // }

  // onPersonalDataSubmit() {
  //     this.personalDraftReqPayload = {
  //       leadID: this.leadID,
  //       loanApplictionDraftDetailID: null,
  //       storageType: "APPLICANT_PERSONAL",
  //       draftData: JSON.stringify({
  //         applicantDetails: [
  //           {
  //             addressDetailList: [
  //               {
  //                 address1: this.thirdStep.controls.addressLine1.value,
  //                 address2: this.thirdStep.controls.addressLine2.value,
  //                 cityID: this.thirdStep.controls.city.value,
  //                 cityName: "laxkinagar",
  //                 districtID: this.thirdStep.controls.district.value,
  //                 districtName: "delhi",
  //                 sameAsCurrentAddress: false,
  //                 stateID: this.thirdStep.controls.state.value,
  //                 stateName: "India ",
  //                 zip: this.thirdStep.controls.pincode.value,
  //               }
  //             ],
  //             adharnumber: this.thirdStep.controls.aadhar_number.value,
  //             applicantkyclist: [],
  //             contactdetail: {
  //               email: this.thirdStep.controls.co_email_id.value,
  //               fax: "",
  //               isEmailVerified: false,
  //               isMobileVerified: true,
  //               mobile: this.thirdStep.controls.co_mobile_number.value,
  //             },
  //             dateOfBirth: this.thirdStep.controls.co_dob.value,
  //             firstName: this.thirdStep.controls.co_first_name.value,
  //             genderTypeDetailID: this.selectedGender,
  //             incomeConsidered: null,
  //             isActive: true,
  //             isMainApplicant: true,
  //             lastName: this.thirdStep.controls.co_last_name.value,
  //             leadApplicantNumber: this.leadApplicantNumber,
  //             middleName: this.thirdStep.controls.co_middle_name.value,
  //             nationalityTypeDetailID: 345,
  //             panNumber: this.thirdStep.controls.pan_card.value,
  //           }
  //         ]
  //       })
  //     }
  //     if(this.currentTabIndex >0){
  //     let lastIndex = this.persoanlDraftData.length - 1;
  //     this.persoanlDraftData[lastIndex] = {
  //       addressDetailList: [
  //         {
  //           address1: this.thirdStep.controls.addressLine1.value,
  //           address2: this.thirdStep.controls.addressLine2.value,
  //           cityID: this.thirdStep.controls.city.value,
  //           cityName: "laxkinagar",
  //           districtID: this.thirdStep.controls.district.value,
  //           districtName: "delhi",
  //           sameAsCurrentAddress: false,
  //           stateID: this.thirdStep.controls.state.value,
  //           stateName: "India ",
  //           zip: this.thirdStep.controls.pincode.value,
  //         }
  //       ],
  //       adharnumber: this.thirdStep.controls.aadhar_number.value,
  //       applicantkyclist: [],
  //       contactdetail: {
  //         email: this.thirdStep.controls.co_email_id.value,
  //         fax: "",
  //         isEmailVerified: false,
  //         isMobileVerified: true,
  //         mobile: this.thirdStep.controls.co_mobile_number.value,
  //       },
  //       dateOfBirth: this.thirdStep.controls.co_dob.value,
  //       firstName: this.thirdStep.controls.co_first_name.value,
  //       genderTypeDetailID: this.selectedGender,
  //       incomeConsidered: null,
  //       isActive: true,
  //       isMainApplicant: true,
  //       lastName: this.thirdStep.controls.co_last_name.value,
  //       leadApplicantNumber: this.leadID+new Date().getUTCMilliseconds(),
  //       middleName: this.thirdStep.controls.co_middle_name.value,
  //       nationalityTypeDetailID: 345,
  //       panNumber: this.thirdStep.controls.pan_card.value,
  //     }
  //     console.log("persoanlDraftData- ", this.persoanlDraftData);
        
  //       this.apiservice.post(APIConstant.PERSONAL_AND_INCOME_DRAFT, {
  //         leadID: this.leadID,
  //         loanApplictionDraftDetailID: null,
  //         storageType: "APPLICANT_PERSONAL",
  //         draftData: JSON.stringify(this.persoanlDraftData)
  //       }, resObj => {
  //       })
        

  //     }else{
  //     this.apiservice.post(APIConstant.PERSONAL_AND_INCOME_DRAFT, this.personalDraftReqPayload, resObj => {
        
  //     })
  //   }
    
  // }

  // getPersonalDraftData() {
  //   this.apiservice.get(APIConstant.GET_DRAFT_DATA + this.leadID + '/type/' + 'APPLICANT_PERSONAL/', {}, resObj => {
  //     let resDraftData = JSON.parse(resObj.draftData);
  //     this.persoanlDraftData = resDraftData;  
  //     if(this.persoanlDraftData.applicantDetails){
  //       let filteredApplicantData = this.persoanlDraftData.applicantDetails.filter((item)=>{
  //         return item.leadApplicantNumber === this.currentLeadApplicantNumber;
  //       });
  //       console.log("filteredApplicantData.adharnumber- ", filteredApplicantData);
  //         this.thirdStep.controls['co_first_name'].setValue(filteredApplicantData.firstName);
  //         this.thirdStep.controls['co_middle_name'].setValue(filteredApplicantData.middleName);
  //         this.thirdStep.controls['co_last_name'].setValue(filteredApplicantData.lastName);
  //         this.thirdStep.controls['co_dob'].setValue(filteredApplicantData.dateOfBirth);
  //         this.thirdStep.controls['co_mobile_number'].setValue(filteredApplicantData.mobile);
  //         this.thirdStep.controls['pan_card'].setValue(filteredApplicantData.panNumber);
  //         this.thirdStep.controls['aadhar_number'].setValue(filteredApplicantData.adharnumber);
  //         this.thirdStep.controls['co_email_id'].setValue(filteredApplicantData.contactdetail.email);
  //         this.thirdStep.controls['pincode'].setValue(filteredApplicantData.addressDetailList[0].zip);
  //         this.thirdStep.controls['district'].setValue(filteredApplicantData.addressDetailList[0].districtID);
  //         this.thirdStep.controls['city'].setValue(filteredApplicantData.addressDetailList[0].cityID);
  //         this.thirdStep.controls['state'].setValue(filteredApplicantData.addressDetailList[0].stateID);
  //     }
  //     });
  //     }

}
