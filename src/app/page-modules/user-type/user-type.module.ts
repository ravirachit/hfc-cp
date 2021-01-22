import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeComponent } from './user-type/user-type.component';
import { UserTypeRoutingModule } from './user-type-routing.module';
import { UserTypeHeaderComponent } from './user-type-header/user-type-header.component';
import { MaterialModule } from 'src/app/material';



@NgModule({
  declarations: [
    UserTypeComponent,
    UserTypeHeaderComponent
  ],
  imports: [
    CommonModule,
    UserTypeRoutingModule,
    MaterialModule
  ]
})
export class UserTypeModule { }
