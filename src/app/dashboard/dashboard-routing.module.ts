import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { HomeModule } from '../home/home.module';
import { HomeComponent } from '../home/home.component';
import { DrafterModule } from '../drafter/drafter.module';
import { DrafterComponent } from '../drafter/drafter.component';
import { AdminGuard } from './admin-guard.service';
import { DrafterGuard } from './drafter-guard.service';
import { AuthGuard } from '../core/services/auth-guard.service';
import { DrawingComponent } from '../drawing/drawing.component';
import { RequestDrawingsModule } from '../request-drawings/request-drawings.module';
import { RequestDrawingsComponent } from '../request-drawings/request-drawings.component';
import { ClientsComponent } from '../clients/clients.component';
import { ClientsModule } from '../clients/clients.module';
import { TRANSMITTAL_FORMS_ROUTES } from '../transmittal-forms/transmittal-forms.routes';
import { TENDER_DRAWING_ROUTES } from '../tender-drawing/tender-drawing-routes';
import { TenderDrawingModule } from '../tender-drawing/tender-drawing.module';
import { SHOP_DRAWING_ROUTES } from '../shop-drawing/shop-drawing.routes';
import { AS_BUILT_DRAWINGS_ROUTES } from '../as-built-drawing/as-built.routes';
import { TYPE_DRAWING_ROUTES } from '../type-drawing/type-drawing.routes';
import { LayoutModule } from '../layout/layout.module';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsComponent } from '../projects/projects.component';

//  TODO: Optimize routes.
const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'requests',
        canActivate: [DrafterGuard],
        component: DrafterComponent
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: ProjectsComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: DrawingComponent,
              },
              {
                path: 'requests',
                component: DrafterComponent,
                canActivate: [DrafterGuard],
              },
              {
                path: 'clients',
                children: [
                  {
                    path: '',
                    component: ClientsComponent,
                  },
                ]
              },
              TRANSMITTAL_FORMS_ROUTES,
            ]
          },
        ]
      },
      TENDER_DRAWING_ROUTES,
      SHOP_DRAWING_ROUTES,
      AS_BUILT_DRAWINGS_ROUTES, 
      TYPE_DRAWING_ROUTES,
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProjectsModule,
    HomeModule,
    DrafterModule,
    ClientsModule,
    RequestDrawingsModule,
  ],
  exports: [RouterModule],
})

export class DashboardRoutingModule {}