import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrafterComponent } from './drafter.component';
import { LayoutModule } from '../layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MatTableModule } from '@angular/material/table';
import { RequestsTableComponent } from './requests-table/requests-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CompleteDrawingRequestComponent } from './complete-drawing-request/complete-drawing-request.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RequestTableFiltersComponent } from './request-table-filters/request-table-filters.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RequestSummaryComponent } from './request-summary/request-summary.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [DrafterComponent, RequestsTableComponent, CompleteDrawingRequestComponent, RequestTableFiltersComponent, RequestSummaryComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ContentLoaderModule,
    SharedModule,
    FlexLayoutModule,
    SweetAlert2Module,
    MatPaginatorModule,
    RouterModule,
  ],
})
export class DrafterModule { }
