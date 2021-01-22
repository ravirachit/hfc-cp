import { Component, Input, OnInit, ɵConsole } from '@angular/core';
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
  selector: 'app-provide-details',
  templateUrl: './provide-details.component.html',
  styleUrls: ['./provide-details.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ProvideDetailsComponent implements OnInit {
  firstStep: FormGroup;
  secondStep: FormGroup;
  thirdStep: FormGroup;
  fourthStep: FormGroup;
  isSubmitFirstStep: boolean;
  isSubmitThirdStep: boolean;
  isSubmitFourthStep: boolean;
  isFirstStep: boolean = true;
  isThirdStep: boolean;
  isFourthStep: boolean;
  isIncomeAdditionalField: boolean;
  isIncomeRemainingFields: boolean = true;
  loanTypeData: any = [];
  residenceTypeData: any = [];
  genderTypeData: any = [];
  propertyIdentifiedTypeData: any = [];
  loanPurposeTypeData: any = [];
  loanProductData: any = [];
  loanType:any = 1;
  residencyStatus:any = 1606;
  selectedGender:any = 1;
  applicantTabs = [{applicant:'Applicant'}];
  selectedTabValue = new FormControl(0);
  validationMessage = ValidationMessage
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
  properties = [
    { value: '1', viewValue: 'Property 1' },
    { value: '2', viewValue: 'Property 2' },
    { value: '3', viewValue: 'Property 3' }
  ];
  questionValue = [
    { value: 'true', viewValue: 'Yes' },
    { value: 'false', viewValue: 'No' },
  ]
  additionalIncomeTypeData:any = [];
  RelationshipTypeData:any = [];
  enteredOTP: any;
  newInputMobileNumber: any;
  isDisabled: boolean;
  forSalaried: boolean = true;
  forSelfEmployedProfessional: boolean;
  forSelfEmployed: boolean;
  isResendOTP: boolean;
  isOTPtimer: boolean;
  counter$: Observable<number>;
  count = 61;
  stateData: any = [];
  districtData: any = [];
  cityData: any = [];
  leadID: any = this.localStorageService.getData(CustomStorage.localKeys.leadID);
  timeIntervalFunc;
  timeIntervalIncome;
  propertyLocationData:any = [];
  leadApplicantNumber = this.leadID+new Date().getUTCMilliseconds();
  persoanlDraftData:any = [];
  incomeDraftData:any = [];
  personalDraftReqPayload:any;
  incomeDraftReqPayload:any;
  currentTabIndex:any = 0;
  currentIncomeTabIndex:any = 0;
  currentLeadApplicantNumber:any;
  applicantDataList:any = [];
  blankObj: {};
  newCoApplicantFlag:any = null;
  incomeLeadApplicantNumber:any;
  residencyTypeDetailsResID:any;
  genderResTypeDetailsId:any;
  proposedPropertyOwnerResTypeId:any;
  proposedPropertyOwnerTypeId:any = 1161;
  proposedPropertyOwnerTypeData:any = [];
  isAddressSameAsApplicant:boolean;

  constructor(private modalService: NgbModal, private _fb: FormBuilder, private apiservice: ApiService, private localStorageService: LocalStorageService) {
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
    if (this.count == 0) {
      this.isResendOTP = true;
      this.isOTPtimer = false;
    }
  }


  ngOnInit(): void {
    this.bindApplicantData();
    this.bindApplicantIncomeData();
    this.loadDropdownMaster();
    this.loanPrduct();
    this.getLeadData();
    this.getCitiesList();
    // First Step form control
    this.firstStep = this._fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email_id: ['', [Validators.maxLength(100),
      Validators.pattern(regExConstant.email)]],
      required_loan_amount: ['', Validators.required],
      loan_purpose: ['', Validators.required],
      required_tenure_in_months: ['', Validators.required],
      property_is_identified: ['', Validators.required],
      property_location: ['', Validators.required],
      // estimated_market_value: [''],
    });

    // Third Step form control
    this.thirdStep = this._fb.group({
      co_first_name: ['', Validators.required],
      co_middle_name: [''],
      co_last_name: ['', Validators.required],
      co_dob: ['', Validators.required],
      co_mobile_number: ['', Validators.required],
      co_email_id: ['', [Validators.maxLength(100),
      Validators.pattern(regExConstant.email)]],
      pan_card: ['', [Validators.required, Validators.pattern(regExConstant.panNumber)]],
      aadhar_number: ['', [Validators.required, Validators.pattern(regExConstant.uidNumber)]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
    });

    // Fourth Step form control
    this.fourthStep = this._fb.group({
      relationship_with_applicant: [''],
      monthly_cross_income: ['', Validators.required],
      annual_gross_total_income: ['', Validators.required],
      additionalIncomeType: [''],
      is_income_considered:[''],
      // monthly_net_income:['',Validators.required],
      // annual_bonus:['',Validators.required],
      pay_as_emi: ['', Validators.required],
      additional_income: [''],
      isFillingRegularITR: ['', Validators.required],
      is_salaried_credited_in_bank: ['', Validators.required],
      total_monthly_obligation: ['', Validators.required],
      company_name: ['', Validators.required],
      total_work_experience: ['', Validators.required],
      retirement_age: ['', Validators.required],
      total_business_vintage: ['', Validators.required]
    });
  }


  // Get value on time of OTP Change
  onOtpChange(otp) {
    this.enteredOTP = otp;
    if (this.enteredOTP.length == 6) {
      this.isDisabled = false;
    }
    if (this.enteredOTP.length < 6) {
      this.isDisabled = true;

    }
  }
  // Radio type Event
  onChangeLoanType(selectedValue) {
    this.loanType = selectedValue;
    this.loanProductData.forEach(element => {
      if (this.loanType == element.productID) {
        this.loanPurposeTypeData = element.loanPurposeList;
      }
    });
  }
  onChangeResidencyType(selectedValue) {
    this.residencyStatus = Number(selectedValue);
  }
  onChangeGender(selectedValue) {
    this.selectedGender = selectedValue;
  }
  onChangeProposedOwnerType(selectedValue){
    this.proposedPropertyOwnerTypeId = selectedValue;
  }
  onEmpTypeValueChange(SelectedValue) {
    if (SelectedValue == 'salaried') {
      this.forSalaried = true;
      this.forSelfEmployedProfessional = false;
      this.forSelfEmployed = false;
    }
    if (SelectedValue == 'self_employed_professional') {
      this.forSalaried = false;
      this.forSelfEmployedProfessional = true;
      this.forSelfEmployed = false;
    }
    if (SelectedValue == 'self_employed') {
      this.forSalaried = false;
      this.forSelfEmployedProfessional = false;
      this.forSelfEmployed = true;
    }
  }


  openModal(modalContent) {
    this.modalService.open(modalContent, {
      size: 'sm',
      keyboard: false,
      windowClass: "custome-Modal-css"
    });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  // For lead Creation
  onCreateLead(modalContent) {
    this.isDisabled = true;
    this.isSubmitFirstStep = true;
    this.newInputMobileNumber = this.firstStep.controls.mobile_number.value;
    if(this.firstStep.invalid){
      return;
    }else{
      if (this.currentTabIndex == 0) {
        this.thirdStep.controls['co_first_name'].setValue(this.firstStep.controls.first_name.value);
        this.thirdStep.controls['co_middle_name'].setValue(this.firstStep.controls.middle_name.value);
        this.thirdStep.controls['co_last_name'].setValue(this.firstStep.controls.last_name.value);
        this.thirdStep.controls['co_dob'].setValue(this.firstStep.controls.dob.value);
        this.thirdStep.controls['co_mobile_number'].setValue(this.firstStep.controls.mobile_number.value);
        this.thirdStep.controls['co_email_id'].setValue(this.firstStep.controls.email_id.value);
      } else {
        this.thirdStep.controls['co_first_name'].reset();
        this.thirdStep.controls['co_middle_name'].reset();
        this.thirdStep.controls['co_last_name'].reset();
        this.thirdStep.controls['co_dob'].reset();
        this.thirdStep.controls['co_mobile_number'].reset();
        this.thirdStep.controls['co_email_id'].reset();
      }
      this.thirdStep.controls['district'].disable();
      this.thirdStep.controls['city'].disable();
      this.thirdStep.controls['state'].disable();

    let requestPayload = {
      applicantFirstName: this.firstStep.controls.first_name.value,
      applicantMiddleName: this.firstStep.controls.middle_name.value,
      applicantLastName: this.firstStep.controls.last_name.value,
      applicantContactNumber: this.firstStep.controls.mobile_number.value,
      applicantAlternativeContactNumber: null,
      applicantEmail: this.firstStep.controls.email_id.value,
      applicantAddress: 'Testing Address',
      remarks: null,
      loanProductID: this.loanType,
      loanPurposeID: this.firstStep.controls.loan_purpose.value,
      branchID: 1,
      amountRequest: this.firstStep.controls.required_loan_amount.value,
      applicantResidencyTypeDetailID: this.residencyStatus,
      applicantGenderTypeDetailID: this.selectedGender,
      applicantDOB: this.firstStep.controls.dob.value,
      propertyLocationTypeDetailID: Number(this.firstStep.controls.property_location.value),
      estimatedPropertyValue: null,
      applicantPropertyOwner: true,
      isPropertyIdentified: Boolean(this.firstStep.controls.property_is_identified.value),
      requestedTenor: Number(this.firstStep.controls.required_tenure_in_months.value),
      totalIncome: null
      
    }
    if(this.leadID === null){
    this.apiservice.post(APIConstant.CREATE_LEAD, requestPayload, resObj => {
      this.isSubmitFirstStep = false;
      if (this.localStorageService.getData(CustomStorage.localKeys.phone) === this.firstStep.controls.mobile_number.value) {
        this.isFirstStep = false;
        this.isThirdStep = true;
      } else {
        const verifyNumberPayload = {
          mobileNumber: this.firstStep.controls.mobile_number.value,
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
          },
          error => {
          }
        );
        this.openModal(modalContent);
      }
    },
      err => {
        alert(err.error.responseMsg);
      });
    }else{
      this.isFirstStep = false;
      this.isThirdStep = true;
    }
  }
  }

  // Get lead Data
  getLeadData() {
    this.apiservice.get(APIConstant.CREATE_LEAD + this.leadID, {}, resObj => {
      if(this.leadID !== null){
        this.firstStep.disable();
        this.firstStep.controls['first_name'].setValue(resObj.applicantFirstName);
        this.firstStep.controls['middle_name'].setValue(resObj.applicantMiddleName);
        this.firstStep.controls['last_name'].setValue(resObj.applicantLastName);
        this.firstStep.controls['dob'].setValue(resObj.applicantDOB);
        this.firstStep.controls['mobile_number'].setValue(resObj.applicantContactNumber);
        this.firstStep.controls['email_id'].setValue(resObj.applicantEmail);
        this.firstStep.controls['required_loan_amount'].setValue(resObj.amountRequest);
        this.firstStep.controls['loan_purpose'].setValue(resObj.loanPurposeID);
        this.firstStep.controls['required_tenure_in_months'].setValue(resObj.requestedTenor);
        this.firstStep.controls['property_is_identified'].setValue(String(resObj.isPropertyIdentified));
        this.firstStep.controls['property_location'].setValue(4); //resObj.propertyLocationTypeDetailID
      }else{
        this.firstStep.reset();
        this.firstStep.enable();
      }
      // alert(JSON.stringify(resObj));
    })
  }
  
  // Bind personal section data for all the applicants
  bindApplicantData(){
            this.apiservice.get(APIConstant.GET_DRAFT_DATA + this.leadID + '/type/' + 'APPLICANT_PERSONAL/', {}, resObj => {
              let resDraftData = JSON.parse(resObj.draftData);
              this.persoanlDraftData = resDraftData; 
              console.log("just for check- ",typeof this.persoanlDraftData);
              if(this.persoanlDraftData ===  null){
                this.persoanlDraftData = [];
                this.persoanlDraftData.push([]);
                console.log(typeof this.persoanlDraftData);
              } else{
                this.incomeLeadApplicantNumber = this.persoanlDraftData[0].leadApplicantNumber;
                console.log(typeof this.persoanlDraftData);
                this.currentLeadApplicantNumber =
                this.persoanlDraftData[this.currentTabIndex] &&
                this.persoanlDraftData[this.currentTabIndex].leadApplicantNumber;
                if(this.persoanlDraftData[this.currentTabIndex] !==  undefined){
                  this.patchFormValues(this.persoanlDraftData[this.currentTabIndex]);
                }
                this.setCurrentTabId(
                  this.currentLeadApplicantNumber,
                  this.currentTabIndex,
                );
              }
    });
  }

  // Bind income section data for all the applicants
 bindApplicantIncomeData(){
    this.apiservice.get(APIConstant.GET_DRAFT_DATA + this.leadID + '/type/' + 'APPLICANT_INCOME/', {}, resObj => {
      let resDraftData = JSON.parse(resObj.draftData);
              this.incomeDraftData = resDraftData;
              console.log("this.incomeDraftData - ", this.incomeDraftData);
              this.incomeLeadApplicantNumber =
              this.incomeDraftData[this.currentIncomeTabIndex] &&
              this.incomeDraftData[this.currentIncomeTabIndex].leadApplicantNumber;
              if(this.incomeDraftData[this.currentIncomeTabIndex] !==  undefined){
                this.patchIncomeFormValues(this.incomeDraftData[this.currentIncomeTabIndex]);
              }
              this.setCurrentIncomeTabId(
                this.incomeLeadApplicantNumber,
                this.currentIncomeTabIndex,
              );
    })
  }


  patchFormValues(persoanlDraftData) {
    console.log("persoanlDraftData- ", persoanlDraftData);
    if(this.newCoApplicantFlag !== null){
      this.thirdStep.reset();
    }else{
          this.residencyTypeDetailsResID = persoanlDraftData.nationalityTypeDetailID;
          if(persoanlDraftData.genderTypeDetailID){
            this.genderResTypeDetailsId = persoanlDraftData.genderTypeDetailID;
            this.proposedPropertyOwnerResTypeId = persoanlDraftData.proposedPropertyOwner;
          }
          this.pincodeEvent(persoanlDraftData.addressDetailList[0].zip);
          this.thirdStep.controls['co_first_name'].setValue(persoanlDraftData.firstName);
          this.thirdStep.controls['co_middle_name'].setValue(persoanlDraftData.middleName);
          this.thirdStep.controls['co_last_name'].setValue(persoanlDraftData.lastName);
          this.thirdStep.controls['co_dob'].setValue(persoanlDraftData.dateOfBirth);
          this.thirdStep.controls['co_mobile_number'].setValue(persoanlDraftData.contactdetail.mobile);
          this.thirdStep.controls['pan_card'].setValue(persoanlDraftData.panNumber);
          this.thirdStep.controls['aadhar_number'].setValue(persoanlDraftData.adharnumber);
          this.thirdStep.controls['co_email_id'].setValue(persoanlDraftData.contactdetail.email);
          this.thirdStep.controls['addressLine1'].setValue(persoanlDraftData.addressDetailList[0].address1);
          this.thirdStep.controls['addressLine2'].setValue(persoanlDraftData.addressDetailList[0].address2);
          this.thirdStep.controls['pincode'].setValue(persoanlDraftData.addressDetailList[0].zip);
          this.thirdStep.controls['district'].setValue(persoanlDraftData.addressDetailList[0].districtID);
          this.thirdStep.controls['city'].setValue(persoanlDraftData.addressDetailList[0].cityID);
          this.thirdStep.controls['state'].setValue(persoanlDraftData.addressDetailList[0].stateID);
  }
}
patchIncomeFormValues(incomeDraftData){
  if(this.newCoApplicantFlag !== null){
    this.fourthStep.reset();
  }else{
    if(incomeDraftData !== undefined){
    this.fourthStep.controls['relationship_with_applicant'].setValue(incomeDraftData.relationWithApplicant);
    this.fourthStep.controls['monthly_cross_income'].setValue(incomeDraftData.incomeDetail.monthlyGrossIncome);
    this.fourthStep.controls['annual_gross_total_income'].setValue(incomeDraftData.incomeDetail.annualGrossTotalIncome);
    this.fourthStep.controls['additionalIncomeType'].setValue(incomeDraftData.incomeDetail.additionalIncomeType);
    this.fourthStep.controls['is_income_considered'].setValue(incomeDraftData.incomeConsidered);
    this.fourthStep.controls['pay_as_emi'].setValue(incomeDraftData.payAsEmi);
    this.fourthStep.controls['additional_income'].setValue(incomeDraftData.incomeDetail.additionalIncome);
    this.fourthStep.controls['isFillingRegularITR'].setValue(incomeDraftData.isFillingRegularITR);
    this.fourthStep.controls['is_salaried_credited_in_bank'].setValue(incomeDraftData.isSalariedCreadedInBank);
    this.fourthStep.controls['total_monthly_obligation'].setValue(incomeDraftData.incomeDetail.totalMonthlyObligation);
    this.fourthStep.controls['company_name'].setValue(incomeDraftData.companyName);
    this.fourthStep.controls['total_work_experience'].setValue(incomeDraftData.totalExperience);
    this.fourthStep.controls['retirement_age'].setValue(incomeDraftData.retirementAge);
    this.fourthStep.controls['total_business_vintage'].setValue(incomeDraftData.totalBusinessVintage);
    }
}
}

  resendOTP() {
    const verifyNumberPayload = {
      mobileNumber: this.firstStep.controls.mobile_number.value,
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
      APIConstant.GENERATE_OTP, verifyNumberPayload, resObj => {
        this.isResendOTP = false;
        this.isOTPtimer = true;
      },
      error => {
      }
    );
  }

  afterProceedOTP() {
    const verifyOTPpayload = {
      mobileNumber: this.firstStep.controls.mobile_number.value,
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
      APIConstant.VERIFY_OTP, verifyOTPpayload, resObj => {
      }
    );
    this.closeModal();
    this.isFirstStep = false;
    this.isThirdStep = true;
  }

  // Personal Data submit event
  onPersonalDataSubmit() {
    // clearInterval(this.timeIntervalFunc);
    this.isSubmitThirdStep = true;
    if(this.thirdStep.invalid){
      return;
    }else{
      if(this.persoanlDraftData.length -1 == this.currentTabIndex){
        this.apiservice.post(APIConstant.PERSONAL_AND_INCOME_DRAFT, {
          leadID: this.leadID,
          loanApplictionDraftDetailID: null,
          storageType: "APPLICANT_INCOME",
          draftData: JSON.stringify(this.incomeDraftData.push([]))
        }, resObj => {
          this.newCoApplicantFlag = null;
        })
      }
      this.persoanlDraftData[this.currentTabIndex] =  {
        addressDetailList: [
          {
            address1: this.thirdStep.controls.addressLine1.value,
            address2: this.thirdStep.controls.addressLine2.value,
            cityID: this.thirdStep.controls.city.value,
            cityName: "laxkinagar",
            districtID: this.thirdStep.controls.district.value,
            districtName: "delhi",
            sameAsCurrentAddress: false,
            stateID: this.thirdStep.controls.state.value,
            stateName: "India ",
            zip: this.thirdStep.controls.pincode.value,
          }
        ],
        adharnumber: this.thirdStep.controls.aadhar_number.value,
        applicantkyclist: [],
        contactdetail: {
          email: this.thirdStep.controls.co_email_id.value,
          fax: "",
          isEmailVerified: false,
          isMobileVerified: true,
          mobile: this.thirdStep.controls.co_mobile_number.value,
        },
        dateOfBirth: this.thirdStep.controls.co_dob.value,
        firstName: this.thirdStep.controls.co_first_name.value,
        genderTypeDetailID: this.selectedGender,
        incomeConsidered: null,
        isActive: true,
        isMainApplicant: true,
        lastName: this.thirdStep.controls.co_last_name.value,
        leadApplicantNumber: this.leadApplicantNumber,
        middleName: this.thirdStep.controls.co_middle_name.value,
        nationalityTypeDetailID: this.residencyStatus,
        panNumber: this.thirdStep.controls.pan_card.value,
        proposedPropertyOwner: this.proposedPropertyOwnerTypeId
      }
      this.apiservice.post(APIConstant.PERSONAL_AND_INCOME_DRAFT, {
        leadID: this.leadID,
        loanApplictionDraftDetailID: null,
        storageType: "APPLICANT_PERSONAL",
        draftData: JSON.stringify(this.persoanlDraftData)
      }, resObj => {
        this.bindApplicantIncomeData();
        if (this.currentIncomeTabIndex == 0) {
          this.isIncomeAdditionalField = true;
          this.isAddressSameAsApplicant = false;
        } 
        if(this.currentIncomeTabIndex > 0){
          this.isIncomeAdditionalField = false;
          this.isAddressSameAsApplicant = true;
        }
        this.newCoApplicantFlag = null;
        this.isThirdStep = false;
        this.isFourthStep = true;
        this.bindApplicantData();
      })

    // Draft Api event.
    // this.timeIntervalIncome = setInterval(() => {
    
    // }, 5000);
    }
    
  }

  getIsIncomeConsideredValue(checkedValue) {
    if (checkedValue.value == "true") {
      this.isIncomeRemainingFields = true;
    } else {
      this.isIncomeRemainingFields = false;
    }
  }

  // Set current tab id for the personal
  setCurrentTabId(leadApplicantNumber,index){
    this.currentTabIndex = index;
    this.currentLeadApplicantNumber = leadApplicantNumber;
    if (this.currentLeadApplicantNumber != null) {
      const data = this.findApplicationDataByApplicantNumber(
        this.currentLeadApplicantNumber
      );
      this.patchFormValues(data);
    } else {
      const data = this.blankObj;
      this.patchFormValues(data);
    }
  }

    // Set current tab id for the Income
  setCurrentIncomeTabId(leadApplicantNumber,index){
    console.log("leadApplicantNumber",leadApplicantNumber)
    console.log("currentIncomeTabIndex",index)
    this.currentIncomeTabIndex = index;
    this.incomeLeadApplicantNumber = leadApplicantNumber;
    if (this.currentIncomeTabIndex == 0) {
      this.isIncomeAdditionalField = true;
      this.isAddressSameAsApplicant = false;
    } 
    if(this.currentIncomeTabIndex > 0){
      this.isIncomeAdditionalField = false;
      this.isAddressSameAsApplicant = true;
    }
    console.log("currentIncomeTabIndex- ,", this.currentIncomeTabIndex  +' :-  '+ "incomeLeadApplicantNumber- ", 
    this.incomeLeadApplicantNumber);
    if (this.incomeLeadApplicantNumber != null) {
      const data = this.findIncomeApplicationData(
        this.incomeLeadApplicantNumber
      );
      this.patchIncomeFormValues(data);
    } else {
      const data = this.blankObj;
      this.patchIncomeFormValues(data);
    }
  }

  // Find data by applicant number for personal
  findApplicationDataByApplicantNumber(applicantNumber) {
    let data = this.persoanlDraftData.filter(dataObj => {
      return dataObj.leadApplicantNumber == applicantNumber;
    });
    if (!data.length) {
      return (data = this.blankObj);
    } else {
      return data[0];
    }
  }

  // Find data by applicant number for income
  findIncomeApplicationData(applicantNumber) {
    let data = this.incomeDraftData.filter(dataObj => {
      console.log("dataObjIncome- ", dataObj);
      return dataObj.leadApplicantNumber == applicantNumber;
    });
    if (!data.length) {
      return (data = this.blankObj);
    } else {
      return data[0];
    }
  }

  // Create new tab for applicant
  onAddCoApplicant() {
    this.newCoApplicantFlag = 'new';
    this.leadApplicantNumber = this.leadID+new Date().getUTCMilliseconds();
    this.persoanlDraftData.push([]);
    this.isIncomeRemainingFields = false;
    this.isFourthStep = false;
    this.isThirdStep = true;
  }

// For check eligilibity submit data
  onCheckEligibility() {
    // clearInterval(this.timeIntervalIncome);
    // this.isSubmitFourthStep = true;
    // if (this.fourthStep.invalid) {
    //   return;
    // } else {
            this.incomeDraftData[this.currentIncomeTabIndex] = {
            addressBean: {
              address1: null,
              address2: null,
              cityID: null,
              cityName: null,
              districtID: null,
              districtName: null,
              sameAsCurrentAddress: false,
              stateID: null,
              stateName: null,
              zip: null,
            },
            companyName: this.fourthStep.controls.company_name.value,
            dateOfJoining: null,
            designation: null,
            employeeID: null,
            employerContactNumber: null,
            employmentTypeDetailID: null,
            relationWithApplicant: this.fourthStep.controls.relationship_with_applicant.value,
            incomeConsidered: this.fourthStep.controls.is_income_considered.value,
            incomeDetail: {
              assessedMonthlyIncome: null,
              itrAverageMonthlyIncome: null,
              itrCurrentYearIncome: null,
              itrLastYearIncome: null,
              salariedDeduction: null,
              totalMonthlyObligation: this.fourthStep.controls.total_monthly_obligation.value,
              additionalIncome: this.fourthStep.controls.additional_income.value,
              monthlyGrossIncome: this.fourthStep.controls.monthly_cross_income.value,
              annualGrossTotalIncome: this.fourthStep.controls.annual_gross_total_income.value,
              additionalIncomeType: this.fourthStep.controls.additionalIncomeType.value,
              salariedGrossIncome: null,
              salariedNetIncome: null
            },
            payAsEmi: this.fourthStep.controls.pay_as_emi.value,
            isFillingRegularITR: this.fourthStep.controls.isFillingRegularITR.value,
            isSalariedCreadedInBank: this.fourthStep.controls.is_salaried_credited_in_bank.value,
            totalBusinessVintage: this.fourthStep.controls.total_business_vintage.value,
            industryTypeDetailID: null,
            isMainApplicant: true,
            isPensioner: null,
            leadApplicantNumber: this.incomeLeadApplicantNumber,
            officialMailID: null,
            profileSegmentTypeDetailID: null,
            retirementAge: this.fourthStep.controls.retirement_age.value,
            sectorTypeDetailID: null,
            subProfileTypeDetailID: null,
            totalExperience: this.fourthStep.controls.total_work_experience.value
    }
    console.log("this.incomeDraftData- ", this.incomeDraftData);

    this.apiservice.post(APIConstant.PERSONAL_AND_INCOME_DRAFT, {
      leadID: this.leadID,
      loanApplictionDraftDetailID: null,
      storageType: "APPLICANT_INCOME",
      draftData: JSON.stringify(this.incomeDraftData)
    }, resObj => {
      this.newCoApplicantFlag = null;
    })
  // }
  }


  getCitiesList(){
    this.apiservice.get(APIConstant.GET_CITY_LIST, {}, resObj=>{
      this.propertyLocationData = resObj;
    })
  }

  pincodeEvent(pincode: any) {
    if (pincode.length == 6) {
      let pincodeValue = pincode
      this.apiservice.get(APIConstant.PINCODE + pincodeValue, {}, resObj => {
        this.stateData = resObj;
        this.districtData = resObj;
        this.cityData = resObj;
        if (this.stateData.length == 0 && this.districtData.length == 0 && this.cityData.length == 0) {
          this.thirdStep.controls['distric'].enable();
          this.thirdStep.controls['city'].enable();
          this.thirdStep.controls['state'].enable();
        }
        if (resObj.length !== 0) {
          this.thirdStep.controls['city'].setValue(this.cityData[0].cityID);
          this.thirdStep.controls['city'].disable();
          this.thirdStep.controls['district'].setValue(this.districtData[0].districtID);
          this.thirdStep.controls['district'].disable();
          this.thirdStep.controls['state'].setValue(this.stateData[0].stateID);
          this.thirdStep.controls['state'].disable();
        }
      })
    }
    if (pincode.length < 6) {
      this.thirdStep.controls['district'].setValue('');
      this.thirdStep.controls['city'].setValue('');
      this.thirdStep.controls['state'].setValue('');
    }
  }


  // Get dropdown value for the loan product & loan purpose
  loanPrduct() {
    this.apiservice.get(APIConstant.LOANPRODUCT, {}, resObj => {
      this.loanProductData = resObj;
      console.log(this.loanProductData);
      this.loanProductData.forEach(element => {
        if (this.loanType == element.productID) {
          this.loanPurposeTypeData = element.loanPurposeList;
        }
      });
    });
  }

  // Get master dropdown list
  loadDropdownMaster() {
    this.apiservice.get(APIConstant.ALLMASTERS, {}, resObj => {
      if (resObj) {
        this.loanTypeData = resObj.LoanType;
        this.loanTypeData.forEach(element => {
          if (this.loanType == element.productID) {
            this.loanPurposeTypeData = element.loanPurposeList;
          }
        });
        this.residenceTypeData = resObj.ApplicantResidencyType;
        this.genderTypeData = resObj.Gender;
        this.propertyIdentifiedTypeData = resObj.PropertyIdentified;
        this.additionalIncomeTypeData = resObj.AdditionalIncomeType;
        this.RelationshipTypeData = resObj.Relationship;
        this.proposedPropertyOwnerTypeData = resObj.ProposedPropertyOwner;
      }
    });
  }

}

// need api for the citis covered by the dmi housing finance
// 