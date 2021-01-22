import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DrafterGuard } from './drafter-guard.service';
import { AdminGuard } from './admin-guard.service';
import { AuthGuard } from '../core/services/auth-guard.service';
import { TenderDrawingModule } from '../tender-drawing/tender-drawing.module';
import { HistoryModule } from '../history/history.module';
import { ShopDrawingModule } from '../shop-drawing/shop-drawing.module';
import { AsBuiltDrawingModule } from '../as-built-drawing/as-built-drawing.module';
import { LayoutModule as AppLayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component';
import { DrawingCategoriesModule } from '../drawing-categories/drawing-categories.module';
import { TypeDrawingModule } from '../type-drawing/type-drawing.module';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    TenderDrawingModule,
    HistoryModule,
    TypeDrawingModule,
    ShopDrawingModule,
    AsBuiltDrawingModule,
    DrawingCategoriesModule,
    AppLayoutModule,
    MatButtonModule,
  ],
  providers: [
    DrafterGuard,
    AdminGuard,
    AuthGuard,
  ],
})
export class DashboardModule { }
