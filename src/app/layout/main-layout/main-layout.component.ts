import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from 'src/app/core/services/menu-service';
import { environment } from 'src/environments/environment';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent implements OnInit {
  menuStatus: boolean = false;
  sbheLink: String = environment.sbhePmUrl;

  constructor(
    public dialog: MatDialog,
    public menuService: MenuService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.setMenu(false);
      }
    })
  }

  ngOnInit() {
    this.menuService.menuStatus.subscribe(res => {
      this.menuStatus = res;
    });
  }

  toggleMenu() {
    this.menuService.setMenuStatus(!this.menuStatus);
  }

  setMenu(boolean) {
    this.menuService.setMenuStatus(boolean);
  }

  handleClick() {
    this.setMenu(false);  
  }
}
