import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, User } from 'src/app/core/services/user.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import _ from 'lodash'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  user: User
  loading: boolean = false;

  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(res => {
      this.user = res
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  onMenuClick() {
    this.menuClicked.emit();
  }
}
