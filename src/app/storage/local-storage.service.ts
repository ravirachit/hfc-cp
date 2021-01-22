import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(keys: string, data: any) {
    localStorage.setItem(keys, data);
  }

  getData(keys: string) {
    return localStorage.getItem(keys);
  }

  deleteData(keys: string) {
    localStorage.removeItem(keys);
  }

  deleteAll() {
    localStorage.clear();
  }

}
