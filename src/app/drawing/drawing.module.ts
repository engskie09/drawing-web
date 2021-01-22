import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { AddDrawingComponent } from './add-drawing/add-drawing.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatButtonModule } from '@angular/material/button';
import { EditDrawingComponent } from './edit-drawing/edit-drawing.component';
import { SubmitShopDrawingComponent } from './submit-shop-drawing/submit-shop-drawing.component';
import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DrawingTableComponent } from './drawing-table/drawing-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DrawingComponent } from './drawing.component';
import { LayoutModule } from '../layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { DrawingService } from './shared/drawing.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DrawingCategorySelectInput } from './drawing-category-select/drawing-category-select.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { MatTableModule } from '@angular/material/table';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DrawingCategoryService } from '../core/services/drawing-category.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { TransmittalFormsModule } from '../transmittal-forms/transmittal-forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DrawingFiltersComponent } from './drawing-filters/drawing-filters.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DrawingCategoriesModule } from '../drawing-categories/drawing-categories.module';
import { ProjectConfigurationComponent } from './project-configuration/project-configuration.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { ProjectConfigurationItemComponent } from './project-configuration/project-configuration-item/project-configuration-item.component';
import { DrawingSummaryListComponent } from './drawing-summary-list/drawing-summary-list.component';
import { DrawingSummaryComponent } from './drawing-summary/drawing-summary.component';
import { ProjectDrawingTypeItemComponent } from './project-configuration/project-drawing-type-item/project-drawing-type-item.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { LatestTransmittalFormComponent } from './latest-transmittal-form/latest-transmittal-form.component';
import { RequestDrawingsModule } from '../request-drawings/request-drawings.module';
import { DrawingTableRequestDrawingComponent } from './drawing-table-request-drawing/drawing-table-request-drawing.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DrawingTableDrawingTargetDateComponent } from './drawing-table-drawing-target-date/drawing-table-drawing-target-date.component';


@NgModule({
  declarations: [
    AddDrawingComponent, 
    EditDrawingComponent, 
    DrawingTableComponent, 
    DrawingComponent,
    SubmitShopDrawingComponent,
    DrawingCategorySelectInput,
    AuditTrailComponent,
    AddCategoryComponent,
    CategorySelectComponent,
    DrawingFiltersComponent,
    ProjectConfigurationComponent,
    ProjectConfigurationItemComponent,
    DrawingSummaryListComponent,
    DrawingSummaryComponent,
    ProjectDrawingTypeItemComponent,
    LatestTransmittalFormComponent,
    DrawingTableRequestDrawingComponent,
    DrawingTableDrawingTargetDateComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MaterialFileInputModule,
    MatButtonModule,
    SweetAlert2Module,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    LayoutModule,
    NgSelectModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    DragDropModule,
    FlexLayoutModule,
    TransmittalFormsModule,
    DrawingCategoriesModule,
    ContentLoaderModule,
    ColorSketchModule,
    SwiperModule,
    RequestDrawingsModule,
  ],
  exports: [
    AddDrawingComponent,
    DrawingTableComponent,
  ],
  providers: [
    DrawingService,
    DrawingCategoryService,
    DatePipe,
    TitleCasePipe,
  ]
})
export class DrawingModule { }
