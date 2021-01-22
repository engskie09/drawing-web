import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AddDrawingComponent } from './add-drawing/add-drawing.component';
import { MatDialog } from '@angular/material/dialog';
import { DrawingService, DrawingParams } from './shared/drawing.service';
import { ProjectsService } from '../core/services/projects.service';
import { Router, ParamMap, Route, ActivatedRoute } from '@angular/router';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FormBuilder } from '@angular/forms';
import { CreateTransmittalFormComponent } from '../transmittal-forms/create-transmittal-form/create-transmittal-form.component';
import { DrawingFiltersComponent, DrawingFiltersDialogData } from './drawing-filters/drawing-filters.component';
import { DrawingFilters } from '../core/models/drawing-filters';
import { Breadcrumb } from '../layout/breadcrumbs/breadcrumbs.component';
import { Project } from '../core/models/project';
import { Client } from '../core/models/client';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProjectConfigurationComponent, ProjectConfigurationDialogData } from './project-configuration/project-configuration.component';
import { DrawingSummaryListComponent } from './drawing-summary-list/drawing-summary-list.component';
import { ProjectConfigurationService } from '../core/services/project-configuration.service';
import { ProjectConfiguration } from '../core/models/project-configuration';
import { Drawing } from './drawing-table/drawing-table.component';
import { ProjectDrawingType } from '../core/models/project-drawing-type';
import { ProjectCategory } from '../core/models/project-category';
import { ProjectCategoryService } from '../core/services/project-category.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {
  @ViewChild('success') successDialog: SwalComponent;
  @ViewChild('drawingSummary') drawingSummary: DrawingSummaryListComponent;

  drawings;
  projectConfig: ProjectConfiguration;
  projectCategories: ProjectCategory[];
  isTableLoading: boolean = false
  isDataLoading: boolean = false
  project: Project;
  isAuthenticated: boolean;
  summary = {
    shopDrawing: null,
    asBuilt: null,
  };
  user = null;
  client: Client = null;

  _filters: DrawingFilters = {
    drawingNo: '',
    category: '',
    uploadedBy: '',
    typeDrawingStatus: [],
  }

  _drawingTableOptions: DrawingTableOptions = {
    perPage: 50,
    currentPage: 1,
  }

  get drawingTableOptions(): DrawingTableOptions {
    return this._drawingTableOptions;
  }

  set drawingTableOptions(options: DrawingTableOptions) {
    this.isTableLoading = true;
    this._drawingTableOptions = options;

    this.getDrawings(this.project.id, options.currentPage, options.perPage)
      .subscribe(res => {
        this.drawings = res.data;
        this.isTableLoading = false;
      });
  }

  get filters(): DrawingFilters {
    return this._filters;
  }

  set filters(filters: DrawingFilters) {
    this._filters = filters;
    this.searchDrawings();
  }

  get pageSizeOptions() {
    const defaultPageSizes = [
      50,
      100,
      150,
    ];

    if(this.drawings.total > 150) {
      defaultPageSizes.push(this.drawings.total);
    }

    return defaultPageSizes;
  }


  constructor(
    public dialog: MatDialog,
    public service: DrawingService,
    public projectService: ProjectsService,
    public projectConfigService: ProjectConfigurationService,
    public projectCategoryService: ProjectCategoryService,
    private userService: UserService,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeData();

    this.userService.currentUser.subscribe((user) => {
      this.user = user; 
    });
  }

  initializeData(): void {
    this.isDataLoading = true;
    this.isTableLoading = true;
    this.route.paramMap.pipe(
      mergeMap(
        (params: ParamMap) => {
          const projectId = params.get('id')
          // TODO: Should I make this as one request?
          const project = this.projectService.getProject(params.get('id'));
          const drawings = this.getDrawings(projectId, this.drawingTableOptions.currentPage, this.drawingTableOptions.perPage);
          const shopDrawingSummary = this.service.getSummary('shop', projectId);
          const asBuiltDrawingSummary = this.service.getSummary('as-built', projectId);
          const client = this.projectService.getClient(projectId);
          const projectConfig = this.projectConfigService.getProjectDrawingTypes(projectId);
          const projectCategories = this.projectCategoryService.getCategories(projectId);

          return forkJoin([project, drawings, shopDrawingSummary, asBuiltDrawingSummary, client, projectConfig, projectCategories]);
        },
      ),
    ).subscribe(([project, drawing, shopDrawingSummary, asBuiltDrawingSummary, client, projectConfig, projectCategories]) => {
      this.project = project;
      this.drawings = drawing.data
      this.summary = {
        shopDrawing: shopDrawingSummary.data,
        asBuilt: asBuiltDrawingSummary.data,
      }
      this.projectCategories = projectCategories;

      this.client = client;
      this.projectConfig = projectConfig;
      this.filters.typeDrawingStatus = this.projectConfig.drawingTypes.map(type => {
        return {
          type: type.id,
          label: type.type,
          value: '',
        }
      });
      this.isTableLoading = false;
      this.isDataLoading = false;
      debugger
    });
  }

  getDrawings(project, page, perPage, params = {}): Observable<any> {
    return this.service.getDrawings(project, {
      page,
      items: perPage,
    });
  }

  showAddDrawing(): void {
    const dialogRef = this.dialog.open(AddDrawingComponent, {
      width: '700px',
      data: {
        projectId: this.project.id,
        type: this.projectConfig.drawingTypes[0],
      }
    })

    dialogRef.componentInstance.formSubmitted.subscribe(res => {
      this.refreshData()
    })
  }

  refreshData(): void {
    this.initializeData()
    this.drawingSummary.getData();
  }

  showAddCategory() {
    const addCategory = this.dialog.open(AddCategoryComponent, {
      width: '700px',
      data: {
        projectId: this.project.id,
      }
    })

    addCategory.componentInstance.formSubmitted.subscribe(res => {
      this.initializeData()
    });

    addCategory.componentInstance.onDeleteSuccess.subscribe(res => {
      this.successDialog.swalOptions = {
        text: 'Category successfuly deleted.'
      }

      this.successDialog.fire();
      this.initializeData();
    });

    addCategory.componentInstance.onEditSuccess.subscribe(res => {
      this.successDialog.swalOptions = {
        text: 'Category successfuly edited.'
      }

      this.successDialog.fire();
      this.initializeData();
    });
  }

  searchDrawings() {
    this.isTableLoading = true;

    const {
      category,
      uploadedBy,
      searchQuery,
      typeDrawingStatus,
    } = this.filters;

    const params: DrawingParams = {
      category,
      type_drawing_status: typeDrawingStatus,
      uploaded_by: uploadedBy,
      query: searchQuery,
      page: this.drawingTableOptions.currentPage,
      items: this.drawingTableOptions.perPage
    }

    this.service.getDrawings(this.project.id, params).subscribe(res => {
      this.drawings = res.data

      this.isTableLoading = false;
    });
  }

  goToDrawingRequests():void {
    const currentUrl = this.router.url;

    this.router.navigateByUrl(`${currentUrl}/requests`);
  }

  goToClients(): void {
    const currentUrl = this.router.url;

    this.router.navigateByUrl(`${currentUrl}/clients`)
  }

  showNewTransmittalForm() {
    this.dialog.open(CreateTransmittalFormComponent, {
      width: '1000px',
    });
  }

  pageEvent($event) {
    this.drawingTableOptions = {
      perPage: $event.pageSize,
      currentPage: $event.pageIndex + 1,
    }
  }

  openFilters() {
    const data: DrawingFiltersDialogData = {
      filters: this.filters,
      categories: this.projectCategories,
    }

    const drawingFiltersDialog = this.dialog.open(DrawingFiltersComponent, {
      width: '700px',
      data,
    });

    drawingFiltersDialog.componentInstance.onFormSubmit.subscribe(filters => {
      this.filters = filters;
    });
  }

  openProjectSettings() {
    const data: ProjectConfigurationDialogData = {
      projectId: this.project.id,
    }

    const projectSettingsDialog =  this.dialog.open(ProjectConfigurationComponent, {
      width: '700px',
      data,
    });

    projectSettingsDialog.componentInstance.onSaveSuccess.subscribe(() => {
      this.successDialog.swalOptions = {
        text: 'Project settings successfuly updated.'
      }

      this.successDialog.fire();
      this.initializeData();
    });
  }

  handleFormSubmit($event) {
    const {
      type,
      action,
    } = $event;

    if(type === 'request-drawing') {
      this.successDialog.swalOptions = {
        text: 'Drawing request successfuly created.'
      }

      this.successDialog.fire();
    }

    this.refreshData();
  }
}


interface DrawingTableOptions {
  perPage: Number;
  currentPage: Number;
}
