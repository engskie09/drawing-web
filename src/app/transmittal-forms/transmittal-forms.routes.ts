import { Routes } from '@angular/router';
import { CreateTransmittalFormComponent } from './create-transmittal-form/create-transmittal-form.component';

export const TRANSMITTAL_FORMS_ROUTES = {
  path: 'transmittal-forms',
  children: [
     {
       path: 'create',
       component: CreateTransmittalFormComponent,
     },
  ]
}
