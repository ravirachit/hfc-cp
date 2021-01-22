import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewApplicationRoutingModule } from './new-application-routing.module';
import { NewApplicationDashboardComponent } from './new-application-dashboard/new-application-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SideNavService } from 'src/app/side-nav.service';
import { ProvideDetailsComponent } from './provide-details/provide-details.component';
import { MaterialModule } from 'src/app/material';
import { NgOtpInputModule } from 'ng-otp-input';
import { DirectivesModule } from "src/app/directives/directives.module";
import { NgxMaskModule } from 'ngx-mask';
import { CheckOfferComponent } from './check-offer/check-offer.component';
import { Ng5SliderModule } from 'ng5-slider';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { PersonalInfoComponent } from './provide-details/personal-info/personal-info.component';


@NgModule({
  declarations: [
    NewApplicationDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ProvideDetailsComponent,
    CheckOfferComponent,
    UploadDocumentComponent,
    PersonalInfoComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewApplicationRoutingModule,
    MaterialModule,
    NgOtpInputModule,
    DirectivesModule,
    Ng5SliderModule,
    NgxMaskModule.forRoot()
  ],
  providers: [SideNavService],
  
})
export class NewApplicationModule { }
