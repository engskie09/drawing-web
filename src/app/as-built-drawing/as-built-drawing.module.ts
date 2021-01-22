import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsBuiltDrawingComponent } from './as-built-drawing.component';
import { LayoutModule } from '../layout/layout.module';
import { HistoryModule } from '../history/history.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AsBuiltDrawingComponent],
  imports: [
    LayoutModule,
    CommonModule,
    HistoryModule,
    RouterModule,
  ]
})
export class AsBuiltDrawingModule { }
