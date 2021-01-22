import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderDrawingHistoryComponent } from './tender-drawing/tender-drawing-history/tender-drawing-history.component';
import { LayoutModule as AppLayoutModule } from '../layout/layout.module';
import { HistoryFiltersComponent } from './history-filters/history-filters.component';
import { TenderDrawingComponent } from './tender-drawing/tender-drawing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MatIconModule } from '@angular/material/icon';
import { TypeDrawingComponent } from './type-drawing/type-drawing.component';
import { TypeDrawingHistoryComponent } from './type-drawing/type-drawing-history/type-drawing-history.component';
import { VersionedFieldComponent } from './shared/versioned-field/versioned-field.component';



@NgModule({
  declarations: [TenderDrawingHistoryComponent, HistoryFiltersComponent, TenderDrawingComponent, TypeDrawingComponent, TypeDrawingHistoryComponent, VersionedFieldComponent],
  imports: [
    CommonModule,
    AppLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    ContentLoaderModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class HistoryModule { }
