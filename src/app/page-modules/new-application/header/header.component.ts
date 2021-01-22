import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  private _opened: boolean = false;

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

  constructor(public sideNavService:SideNavService,private router:Router) { }

  logout(){
    this.router.navigate(['/']);
  }

}
