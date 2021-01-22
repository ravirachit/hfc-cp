import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTypeComponent } from './user-type/user-type.component';

const routes: Routes = [{
  path: "",
  children: [
    { path: "", redirectTo: "user-type-existing-or-new", pathMatch: "full" },
    {
      path: "user-type-existing-or-new",
      component: UserTypeComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTypeRoutingModule { }
