import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOfferComponent } from './check-offer/check-offer.component';
import { NewApplicationDashboardComponent } from './new-application-dashboard/new-application-dashboard.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

const routes: Routes = [{
  path: "",
  children: [
    { path: "", redirectTo: "provide-details", pathMatch: "full" },
    { path: "provide-details",component:NewApplicationDashboardComponent },
    {path: "check-offer", component:CheckOfferComponent },
    {path: "upload-document", component:UploadDocumentComponent }
]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewApplicationRoutingModule { }
