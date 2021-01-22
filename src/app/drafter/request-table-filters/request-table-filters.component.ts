import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DrawingService } from 'src/app/drawing/shared/drawing.service';
import moment from 'moment';

@Component({
  selector: 'app-request-table-filters',
  templateUrl: './request-table-filters.component.html',
  styleUrls: ['./request-table-filters.component.scss']
})
export class RequestTableFiltersComponent implements OnInit {
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();
  @Input() defaultStatus: string = '';
  @Input() defaultTerm: string = '';

  searchTerm: FormControl;
  status: FormControl;
  _filters: RequestTableFilters;
  filterForm: FormGroup;
  approvers;
  minDate: Date;

  set filters(value: RequestTableFilters) {
    this._filters = value;

    this.onFilterChange.emit(this.filters);
  }

  get filters(): RequestTableFilters {
    return this._filters;
  }

  constructor(
    public dialogRef: MatDialogRef<RequestTableFiltersComponent>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private drawingService: DrawingService,
    @Inject(MAT_DIALOG_DATA) public data: RequestTableFiltersDialogData, 
  ) { 
    const searchTerm = this.data.filters.searchTerm ? this.data.filters.searchTerm : '';
    const status = this.data.filters.status ? this.data.filters.status : '';
    const employeeId = this.data.filters.employeeId ? this.data.filters.employeeId : '';
    const fromDate = this.data.filters.fromDate ? this.datePipe.transform(this.data.filters.fromDate, 'dd-MM-yyyy') : '';
    const endDate = this.data.filters.endDate ? this.datePipe.transform(this.data.filters.endDate, 'dd-MM-yyyy') : '';

    const fromDateFormatted = fromDate ? moment(fromDate, 'DD-MM-YYYY').toDate() : '';
    const endDateFormatted = endDate ? moment(endDate, 'DD-MM-YYYY').toDate() : '';

    this.filterForm = this.formBuilder.group({
      searchTerm: new FormControl(searchTerm),
      status: new FormControl(status), 
      fromDate: new FormControl(fromDateFormatted),
      endDate: new FormControl(endDateFormatted),
      employeeId: new FormControl(employeeId),
    });

    if(!fromDate) {
      this.filterForm.controls['endDate'].disable();
    }

    this.filterForm.controls['fromDate'].valueChanges.subscribe(res => {
      if(res) {
        this.minDate = res;
        this.filterForm.controls['endDate'].enable();
      } else {
        this.filterForm.controls['endDate'].disable();
      }
    });
  }

  ngOnInit(): void {
    this.approvers = this.drawingService.getApprovers('shop', this.data.projectId).pipe(
      map(res => res.data)
    );
  }

  private setFilters(key, value): void {
    this.filters = {
      ...this.filters,
      [key]: value ? value : '',
    }
  }

  onSubmit() {
    const {
      searchTerm,
      status,
      fromDate,
      endDate,
      employeeId,
    } = this.filterForm.value;

    const filters: RequestTableFilters = {
      searchTerm,
      status,
      endDate: endDate ? this.datePipe.transform(endDate, 'yyyy-MM-dd') : '',
      fromDate: fromDate ? this.datePipe.transform(fromDate, 'yyyy-MM-dd') : '',
      employeeId,
    }

    this.onFilterChange.emit(filters);
    this.dialogRef.close();
  }

  resetForm() {
    const defaultStatus = this.data.defaultStatus === 'All' ? '' : 'Assigned';

    const initialValues = {
      searchTerm: '',
      status: defaultStatus,
      fromDate: '',
      endDate: '',
      employeeId: '',
    }

    this.filterForm.reset(initialValues);
  }
}

export interface RequestTableFiltersDialogData {
  filters: RequestTableFilters;
  projectId?: number | string;
  defaultStatus?: number | string;
}
export interface RequestTableFilters {
  searchTerm?: string;
  status?: string;
  fromDate?: string;
  endDate?: string;
  employeeId?: string | number;
}
