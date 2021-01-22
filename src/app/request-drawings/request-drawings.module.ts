import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDrawingsComponent } from './request-drawings.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule as AppLayout } from '../layout/layout.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssignDrawingsComponent } from './assign-drawings/assign-drawings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { FeaturedDraftersComponent } from './featured-drafters/featured-drafters.component';
import { DrafterModule } from '../drafter/drafter.module';
import { DrafterService } from '../core/services/drafter.service';
import { FeaturedRequestsComponent } from './featured-requests/featured-requests.component';
import { DrawingRequestService } from '../core/services/drawing-request.service';
import { DrafterTasksComponent } from './drafter-tasks/drafter-tasks.component';
import { RequestDrawingComponent } from './request-drawing/request-drawing.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DraftersComponent } from './drafters/drafters.component';
import { RequestsComponent } from './requests/requests.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DrawingRequestComponent } from './drawing-request/drawing-request.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { RequestDrawingActionComponent } from './request-drawing-action/request-drawing-action.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    RequestDrawingsComponent, 
    AssignDrawingsComponent, 
    FeaturedDraftersComponent, 
    FeaturedRequestsComponent, 
    DrafterTasksComponent, 
    RequestDrawingComponent, 
    DraftersComponent, 
    RequestsComponent, 
    DrawingRequestComponent, 
    RequestDrawingActionComponent
  ],
  imports: [
    CommonModule,
    AppLayout,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatDatepickerModule,
    DragDropModule,
    DrafterModule,
    ContentLoaderModule,
    SweetAlert2Module,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    SharedModule,
  ],
  providers: [
    DrafterService,
    DrawingRequestService,
  ],
  exports: [
    DrawingRequestComponent,
    RequestDrawingComponent,
    RequestDrawingsComponent,
  ]
})
export class RequestDrawingsModule { }
