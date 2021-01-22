import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "verify-otp", component: VerifyOtpComponent },
  { path: 'user-type', loadChildren: () => import('./page-modules/user-type/user-type.module').then(m => m.UserTypeModule) },
  { path: 'dashboard', loadChildren: () => import('./page-modules/new-application/new-application.module').then(m => m.NewApplicationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
