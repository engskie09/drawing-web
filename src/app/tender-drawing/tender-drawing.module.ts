import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderDrawingComponent } from './tender-drawing.component';
import { HistoryModule } from '../history/history.module';
import { LayoutModule as AppLayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TenderDrawingComponent],
  imports: [
    AppLayoutModule,
    CommonModule,
    HistoryModule,
    RouterModule,
  ],
})
export class TenderDrawingModule { }
