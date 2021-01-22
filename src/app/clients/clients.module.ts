import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { LayoutModule as AppLayoutModule } from '../layout/layout.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ClientsService } from '../core/services/clients.service';
import { ClientsFiltersComponent } from './clients-filters/clients-filters.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [ClientsComponent, ClientsFiltersComponent, ClientsFormComponent],
  imports: [
    CommonModule,
    AppLayoutModule,
    ContentLoaderModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SweetAlert2Module,
    ContentLoaderModule,
  ],
  providers: [
    ClientsService,
  ],
})
export class ClientsModule { }
