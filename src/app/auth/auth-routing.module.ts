import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { NoAuthGuard } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    NoAuthGuard
  ]
})
export class AuthRoutingModule {}
