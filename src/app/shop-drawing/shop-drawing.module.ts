import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopDrawingComponent } from './shop-drawing.component';
import { LayoutModule } from '../layout/layout.module';
import { HistoryModule } from '../history/history.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ShopDrawingComponent],
  imports: [
    LayoutModule,
    CommonModule,
    HistoryModule,
    RouterModule,
  ]
})
export class ShopDrawingModule { }
