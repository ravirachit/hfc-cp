import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { ApiService } from "src/app/api.service";
import { APIConstant } from "src/app/constants/apiConstants";
import { CustomStorage } from "src/app/storage/storageKeys";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class UserTypeComponent implements OnInit {
  userTypeDashboardData:any = [];
  current = 0;
  img_list = [
    'assets/new_images/banner1.0',
    'assets/new_images/banner2.0',
    'assets/new_images/banner3.0',
    // 'assets/new_images/banner4.0',
  ];
  
  constructor(private apiservice:ApiService,private localStorageService: LocalStorageService,private router:Router) { }

  ngOnInit(): void {
    this.getLoggedInUserDetails();
    setInterval(() => {
      this.current = ++this.current % this.img_list.length;
    }, 2000);
  }
  getLoggedInUserDetails(){
    const dashboardDetailsPayload = {
      MobileNumber:this.localStorageService.getData(CustomStorage.localKeys.phone)
  }
    this.apiservice.post(APIConstant.USER_DASHBOARD_DETAILS, dashboardDetailsPayload,resObj=>{
      console.log("resObj- ",resObj );
      this.userTypeDashboardData = resObj.responseObj;
    })
  }
  onStartNewApplication(){
    this.localStorageService.deleteData(CustomStorage.localKeys.leadID);
    this.router.navigate(['/dashboard']);
  }
  onViewDetails(leadID){
    this.localStorageService.setData(CustomStorage.localKeys.leadID,leadID)
    this.router.navigate(['/dashboard/provide-details']);
  }

}
