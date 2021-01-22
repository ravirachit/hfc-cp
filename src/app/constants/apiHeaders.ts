import { HttpHeaders } from "@angular/common/http";

let token = JSON.parse(sessionStorage.getItem("token"));

if (token === null) {
  token = "";
}

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    "applicationUserAgent": "droid-customer",
  })
};
