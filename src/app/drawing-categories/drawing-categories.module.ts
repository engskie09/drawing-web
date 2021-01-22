import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingCategoriesTableComponent } from './drawing-categories-table/drawing-categories-table.component';
import { MatTableModule } from '@angular/material/table';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [DrawingCategoriesTableComponent],
  imports: [
    CommonModule,
    ContentLoaderModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    SweetAlert2Module,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    DrawingCategoriesTableComponent,
  ]
})
export class DrawingCategoriesModule { }
