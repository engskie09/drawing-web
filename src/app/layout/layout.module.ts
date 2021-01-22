import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppHeaderComponent, MainLayoutComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    // TODO REMOVE COMPONENTS HERE
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  exports: [
    MainLayoutComponent,
    AppHeaderComponent,
    BreadcrumbsComponent,
  ]
})
export class LayoutModule { }
