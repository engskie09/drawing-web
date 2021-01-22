import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../core';
import { ProjectsService } from '../core/services/projects.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../core/services/user.service';
import { AuthGuard } from '../core/services/auth-guard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RequestDrawingsModule } from '../request-drawings/request-drawings.module';
import { DrafterModule } from '../drafter/drafter.module';
import { ProjectsModule } from '../projects/projects.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RequestDrawingsModule,
    DrafterModule,
    LayoutModule,
    ProjectsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    CoreModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [
    ProjectsService,
    UserService,
    AuthGuard,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
