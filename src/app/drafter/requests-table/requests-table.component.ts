import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DrafterService, DrafterTasksData } from 'src/app/core/services/drafter.service';
import { UserService, User } from 'src/app/core/services/user.service';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { MatDialog } from '@angular/material/dialog';
import { CompleteDrawingRequestComponent } from '../complete-drawing-request/complete-drawing-request.component';
import { RequestTableFilters, RequestTableFiltersComponent, RequestTableFiltersDialogData } from '../request-table-filters/request-table-filters.component';
import { DrawingRequestComponent, DrawingRequestDialogData } from 'src/app/request-drawings/drawing-request/drawing-request.component';
import _ from 'lodash';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})
export class RequestsTableComponent implements OnInit {
  @Input() employeeId;
  @Output() onCompleteSuccess: EventEmitter<any> = new EventEmitter();

  public drawingRequests: DrawingRequest[] = [];
  public isLoading: Boolean = false;
  public columnsToDisplay: Array<string> = [
    'no', 'subject', 'drawing_no', 'drawingType', 'category', 'requestedBy', 'requestDate', 
    'targetDate', 'status', 'actions'
  ];

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

  public tableData: DrafterTasksData = {
    data: [],
    total: 0,
    currentPage: 1,
  }

  set pageNumber(pageNumber: number) {
    this._pageNumber = pageNumber;

    this.getData();
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  private _pageNumber: number = 1;

  _filters: RequestTableFilters = {
    searchTerm: '',
    status: 'Assigned',
    fromDate: '',
    endDate: '',
    employeeId: '',
  }

  set filters(filters: RequestTableFilters) {
    this._filters = filters;

    this.getData();
  }

  get filters(): RequestTableFilters {
    return this._filters;
  }

  @Input() set projectId(id) {
    this._projectId = id;

    this.getData();
  } 

  get projectId() {
    return this._projectId;
  }

  _projectId;

  constructor(
    private drafterService: DrafterService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {}

  getData() {
    this.isLoading = true;
    this.tableData.data = [];

    this.drafterService.getDrafterAssignedTasks(this.employeeId, this.projectId, {
      searchTerm: this.filters.searchTerm,
      status: this.filters.status,
      endDate: this.filters.endDate,
      fromDate: this.filters.fromDate,
      employeeId: this.filters.employeeId,
    }, {
      page: this.pageNumber,
    }).subscribe(res => {
      this.tableData = res;

      this.isLoading = false;
    });
  }

  completeDrawingRequest(drawingRequest: DrawingRequest) {
    const completeDrawingRequest = this.dialog.open(CompleteDrawingRequestComponent, {
      width: '700px',
      data: {
        drawingRequestId: drawingRequest.id,
      }
    });

    completeDrawingRequest.componentInstance.onCompleteSuccess.subscribe(() => {
      this.getData();
      this.onCompleteSuccess.emit();
    });
  }

  viewDrawingRequest(drawingRequest: DrawingRequest) {
    const dialogData: DrawingRequestDialogData = {
      projectId: drawingRequest.drawing.projectId,
      type: 'view',
      isDrafter: true,
      drawingRequest
    }

    const drawingRequestDialog = this.dialog.open(DrawingRequestComponent, {
      width: '700px',
      data: dialogData,
    });
  }

  editDrawingRequest(drawingRequest: DrawingRequest) {
    const dialogData: DrawingRequestDialogData = {
      type: 'edit',
      isDrafter: true,
      drawingRequest
      // projectId: this.projectId,
    }

    const drawingRequestDialog = this.dialog.open(DrawingRequestComponent, {
      width: '700px',
      data: dialogData,
    });
  }

  filter(filters: RequestTableFilters) {
    this.filters = filters;
  }

  generateStatusClass(status: String) {
    const statusTransformed = _.kebabCase(status);

    return `requests-table__status--${statusTransformed}`;
  }

  handlePaginatorChange($event) {
    this.pageNumber = $event.pageIndex + 1;
  }

  openFilters() {
    const filters = this.filters;

    const data: RequestTableFiltersDialogData = {
      filters,
      projectId: this.projectId,
    }

    const dialog = this.dialog.open(RequestTableFiltersComponent, {
      width: '700px',
      data,
    });

    dialog.componentInstance.onFilterChange.subscribe(res => {
      this.filter(res);
    });
  }
}
