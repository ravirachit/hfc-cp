
import {Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SideNavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  private _opened: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav(event) {
    console.log(event);
    this.appDrawer.toggle();
  }
}