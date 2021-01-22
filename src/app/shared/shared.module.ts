import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadInputComponent } from './forms/upload-input/upload-input.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DrawingSelectComponent } from './forms/drawing-select/drawing-select.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AjaxAutocompleteComponent } from './forms/ajax-autocomplete/ajax-autocomplete.component';
import { ClientSelectComponent } from './forms/client-select/client-select.component';


@NgModule({
  declarations: [UploadInputComponent, DrawingSelectComponent, AjaxAutocompleteComponent, ClientSelectComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  exports: [
    UploadInputComponent,
    DrawingSelectComponent,
    ClientSelectComponent,
  ]
})
export class SharedModule { }
