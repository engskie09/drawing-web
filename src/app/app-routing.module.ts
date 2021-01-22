import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawingComponent } from './drawing/drawing.component';
import { DrawingModule } from './drawing/drawing.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './core/services/auth-guard.service';
import { RequestDrawingsModule } from './request-drawings/request-drawings.module';
import { RequestDrawingsComponent } from './request-drawings/request-drawings.component';
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'project/:id',
    component: DrawingComponent,
    canActivate: [
      AuthGuard,
    ]
  },
  {
    path: 'drawing-requests',
    component: RequestDrawingsComponent,
    canActivate: [
      AuthGuard,
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    DrawingModule, 
    HomeModule,
    RequestDrawingsModule
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
