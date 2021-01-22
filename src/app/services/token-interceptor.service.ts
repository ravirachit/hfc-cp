import { Injectable } from "@angular/core";
import { CustomStorage } from "src/app/storage/storageKeys";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private localStorageService:LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = {};
    headers["ApplicationUserAgent"] = "droid-customer";
    if (!req.url.includes("/auth/")) {
      headers["Authorization"] = "Bearer " + JSON.parse(this.localStorageService.getData(CustomStorage.localKeys.token));
      // headers["Content-Type"] = "application/json;";
    }else{
      if(req.body && req.body.company && req.body.company.companySlug){
        headers["CompanySlug"] = req.body.company.companySlug;
    }
  }
    const newReq = req.clone({
      setHeaders: headers
    });
    return next.handle(newReq);
  }
}







