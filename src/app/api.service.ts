import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
declare var $: any;

@Injectable({
  providedIn: "root"
})
export class ApiService {
  token: any = "";
  private url = environment.apiUrl;
  documentResObj: any = {};
  docUploadedPath: any;
  
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  getAsObservable<T>(action: string, model: any): Observable<T> {
    model = model || {};
    model["_x"] = new Date().getTime();
    return this.http
      .get<T>(`${this.url}${action}`, {
        params: model
      });
  }

  post(action: string, model: any, callback: any, errorCalback?: any) {
    const t = new Date().getTime();
    this.http
      .post<any>(`${this.url}${action}?_x=${t}`, model, {
      })
      .subscribe(
        res => {
          if (res) {
            callback(res);
          }
        },
        err=>{
          errorCalback(err);
        }
      );
  }
  get(action: string, model: any, callback: any, errorCalback?: any) {
    model = model || {};
    model["_x"] = new Date().getTime();
    this.http
      .get<any>(`${this.url}${action}`, {
        params: model
      })
      .subscribe(
        res => {
          if (res && res.responseObj && res.responseObj !== "Failure") {
            callback(res.responseObj);
          } else {
          }
        },
        err => {
          }
      );
  }
}
