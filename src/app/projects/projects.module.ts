import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ProjectsComponent } from './projects.component';



@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    LayoutModule,
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
    ProjectsComponent,
  ]
})
export class ProjectsModule { }
