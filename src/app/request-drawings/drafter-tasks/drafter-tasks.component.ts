import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DrafterService, DrafterTasksData } from 'src/app/core/services/drafter.service';
import { Drafter } from 'src/app/core/models/drafter';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { User } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DrawingRequestComponent, DrawingRequestDialogData } from '../drawing-request/drawing-request.component';
import { Drawing } from 'src/app/drawing/shared/drawing.model';
import { RequestDrawingActionComponent } from '../request-drawing-action/request-drawing-action.component';
import _ from 'lodash';
import { RequestTableFiltersComponent, RequestTableFiltersDialogData, RequestTableFilters } from 'src/app/drafter/request-table-filters/request-table-filters.component';

@Component({
  selector: 'drafter-tasks',
  templateUrl: './drafter-tasks.component.html',
  styleUrls: ['./drafter-tasks.component.scss']
})
export class DrafterTasksComponent implements OnInit {
  @Input() loading: Boolean = false;
  @Output() onEditFormSubmit: EventEmitter<any> = new EventEmitter();

  private _drafter: Drafter;
  public columnsToDisplay = ['index', 'requestedBy', 'subject', 'drawingNo', 'status', 'requestedDate', 'targetDate', 'actions'];
  public drafterDrawingRequests: DrawingRequest[] = [];
  public tableData: DrafterTasksData = {
    data: [],
    total: 0,
    currentPage: 1,
  }
  public fetchingRequests: Boolean = false;

  @Input() set drafter(drafter: Drafter) {
    this._drafter = drafter;
    
    if(drafter) {
      this.filters = {
        searchTerm: '',
        status: '',
        employeeId: '',
        endDate: '',
        fromDate: ''
      };

      this.getData();
    }
  }

  get pageSizes(): Array<number> {
    let defaultPageSizes = [
      50,
      100,
      150
    ];

    if(this.tableData.total < 50) {
      defaultPageSizes.unshift(this.tableData.total);
    }

    if(this.tableData.total > 150) {
      defaultPageSizes.push(this.tableData.total);
    }

    return defaultPageSizes;
  }

  get drafter(): Drafter {
    return this._drafter;
  }

  set pageNumber(pageNumber: number) {
    this._pageNumber = pageNumber;

    this.getData();
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  private _pageNumber: number = 1;

  set filters(filters: RequestTableFilters) {
    this._filters = filters;

    this.getData();
  }

  get filters(): RequestTableFilters {
    return this._filters;
  }

  private _filters: RequestTableFilters = {
    searchTerm: '',
    status: '',
    employeeId: '',
    endDate: '',
    fromDate: ''
  }

  constructor(
    private drafterService: DrafterService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {}

  async getData() {
    this.tableData.data = [];
    this.fetchingRequests = true;
    const filters = this.filters;

    this.drafterService.getDrafterTasks(this._drafter.id, {
      page: this.pageNumber,
      filters,
    }).subscribe(res => {
      this.tableData = res;

      this.fetchingRequests = false;
    });
  }

  viewDrawingRequest(drawingRequest: DrawingRequest) {
    const dialogData: DrawingRequestDialogData = {
      type: 'view',
      drawingRequest
      // projectId: this.projectId,
    }

    const viewRequestDialog = this.dialog.open(DrawingRequestComponent, {
      width: '720px',
      restoreFocus: false,
      data: dialogData,
    });

    viewRequestDialog.componentInstance.onApproveSuccess.subscribe(() => this.onEditFormSubmit.emit('Drawing successfuly updated.'));
    viewRequestDialog.componentInstance.onRejectSuccess.subscribe(() => this.onEditFormSubmit.emit('Drawing successfuly rejected.'));
  }

  editDrawingRequest(drawingRequest: DrawingRequest) {
    const dialogData: DrawingRequestDialogData = {
      type: 'edit',
      drawingRequest
      // projectId: this.projectId,
    }

    const editDialogRef = this.dialog.open(DrawingRequestComponent, {
      width: '720px',
      restoreFocus: false,
      data: dialogData,
    });

    editDialogRef.componentInstance.onFormSubmit.subscribe(() => this.onEditFormSubmit.emit());
  }

  showRequestDrawingActionRef(action, drawingRequest) {
    const requestDrawingActionRef = this.dialog.open(RequestDrawingActionComponent, {
      width: '720px',
      restoreFocus: false,
      data: {
        action,
        drawingRequest,
      }
    });

    return requestDrawingActionRef;
  }

  showApproveDrawing(drawingRequest) {
    const dialogRef = this.showRequestDrawingActionRef('approve', drawingRequest);

    dialogRef.componentInstance.onCompleteSuccess.subscribe(() => this.onEditFormSubmit.emit());
  }

  showRejectDrawing(drawingRequest) {
    const dialogRef = this.showRequestDrawingActionRef('reject', drawingRequest);

    dialogRef.componentInstance.onCompleteSuccess.subscribe(() => this.onEditFormSubmit.emit());
  }

  generateStatusClass(status: String) {
    const statusTransformed = _.kebabCase(status);

    return `drafter-tasks-table__status--${statusTransformed}`;
  }

  handlePaginatorChange($event) {
    this.pageNumber = $event.pageIndex + 1;
  }

  openFilters() {
    const filters = this.filters;

    const data: RequestTableFiltersDialogData = {
      projectId: '',
      filters,
      defaultStatus: 'All',
    }

    const dialogRef = this.dialog.open(RequestTableFiltersComponent, {
      width: '700px',
      data,
    });

    dialogRef.componentInstance.onFilterChange.subscribe(res => {
      this.filterRequests(res);
    });
  }

  filterRequests(filters) {
    this.filters = filters;
  }
}
