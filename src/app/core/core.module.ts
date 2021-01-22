import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, ErrorInterceptor } from './interceptors';
import { ApiService } from './api.service';
import { ProjectsService } from './services/projects.service';
import { JwtService } from './services/jwt.service';
import { DrawingRequestAdapter } from './adapters/drawing-request-adapter';
import { ClientAdapter } from './adapters/client-adapter';
import { TransmittalFormService } from './services/transmittal-form.service';
import { TenderDrawingAdapter } from './adapters/tender-drawing-adapter';
import { TypeDrawingService } from './services/type-drawing.service';
import { ProjectAdapter } from './adapters';
import { DrawingCategoryAdapter } from './adapters/drawing-category-adapter';
import { DrafterRequestsSummaryAdapter } from './adapters/drafter-requests-summary-adapter';
import { DrafterRequestsService } from './services/drafter-requests.service';
import { ProjectConfigurationService } from './services/project-configuration.service';
import { MenuService } from './services/menu-service';
import { DrafterAdapter } from './adapters/drafter.adapter';
import { ProjectCategoryService } from './services/project-category.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ApiService,
    ProjectsService,
    TypeDrawingService,
    TransmittalFormService,
    DrafterRequestsService,
    JwtService,
    MenuService,
    ProjectConfigurationService,
    DrawingRequestAdapter,
    TenderDrawingAdapter,
    ClientAdapter,
    ProjectAdapter,
    DrawingCategoryAdapter,
    DrafterRequestsSummaryAdapter,
    DrafterAdapter,
    ProjectCategoryService,
  ],
  declarations: []
})
export class CoreModule {}