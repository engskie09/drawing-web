import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransmittalFormsComponent } from './transmittal-forms.component';
import { CreateTransmittalFormComponent } from './create-transmittal-form/create-transmittal-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TransmittalFormComponent } from './transmittal-form/transmittal-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule as AppLayoutModule } from '../layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { AddTransmittalFormItemComponent } from './add-transmittal-form-item/add-transmittal-form-item.component';
import { TransmittalFormItemComponent } from './transmittal-form-item/transmittal-form-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SignaturePadModule } from 'angular2-signaturepad';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [TransmittalFormsComponent, CreateTransmittalFormComponent, TransmittalFormComponent, AddTransmittalFormItemComponent, TransmittalFormItemComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    AppLayoutModule,
    FlexLayoutModule,
    SharedModule,
    SignaturePadModule,
    MatIconModule
  ]
})
export class TransmittalFormsModule { }
