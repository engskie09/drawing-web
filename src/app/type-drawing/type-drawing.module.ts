import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeDrawingComponent } from './type-drawing.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HistoryModule } from '../history/history.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TypeDrawingComponent],
  imports: [
    CommonModule,
    LayoutModule,
    HistoryModule,
    RouterModule,
  ]
})
export class TypeDrawingModule { }
