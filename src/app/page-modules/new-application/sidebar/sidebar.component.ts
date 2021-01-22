import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/side-nav.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @Input() opened: boolean;

  constructor(private sideNavService: SideNavService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(['/login'])
  }
  ngAfterViewInit() {
    this.sideNavService.appDrawer = this.appDrawer;
  }

}

