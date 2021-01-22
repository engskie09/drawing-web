import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drawing-web';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    this.userService.checkUser();
  }
}
