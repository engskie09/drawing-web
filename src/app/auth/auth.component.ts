import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm;
  loading: Boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { 
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    })
  }

  ngOnInit(): void {
    // this.userService.isAuthenticated.subscribe(
    //   (authenticated) => {
    //     if(authenticated) {
    //       this.router.navigateByUrl('/')
    //     }
    //   }
    // )
  }

  onFormSubmit($event, loginDetails): void {
    $event.preventDefault();
  
    this.loading = true

    this.userService.attemptLogin(loginDetails).subscribe(res => {
      this.loading = false
      this.router.navigateByUrl('/')
    }, err => {
      this.loading = false
      console.log(err)
    });
  }

}
