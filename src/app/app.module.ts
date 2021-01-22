import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './core/services/auth-guard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { DashboardModule } from './dashboard/dashboard.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DrawingCategoriesModule } from './drawing-categories/drawing-categories.module';
// import { ColorPickerModule } from "ngx-color-picker";
import { ColorSketchModule } from 'ngx-color/sketch';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SignaturePadModule } from "angular2-signaturepad";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SweetAlert2Module.forRoot(),
    DashboardModule,
    HttpClientModule,
    MatNativeDateModule,
    MatButtonModule,
    CoreModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    FlexLayoutModule,
    ContentLoaderModule,
    DrawingCategoriesModule,
    MatAutocompleteModule,
    ColorSketchModule,
    SwiperModule,
    SignaturePadModule,
  ],
  providers: [
    AuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'en-SG'},
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
