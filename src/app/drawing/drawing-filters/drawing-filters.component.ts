import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DrawingFilters } from 'src/app/core/models/drawing-filters';
import _ from 'lodash';
import { ProjectCategory } from 'src/app/core/models/project-category';

@Component({
  selector: 'app-drawing-filters',
  templateUrl: './drawing-filters.component.html',
  styleUrls: ['./drawing-filters.component.scss']
})
export class DrawingFiltersComponent implements OnInit {
  filters: FormGroup;
  @Output() onFormSubmit: EventEmitter<DrawingFilters> = new EventEmitter;

  constructor(
    private dialogRef: MatDialogRef<DrawingFiltersComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawingFiltersDialogData,
  ) {
    this.filters = this.formBuilder.group({
      searchQuery: new FormControl(this._extractFilterValues('searchQuery')),
      category: new FormControl(this._extractFilterValues('category')),
      uploadedBy: new FormControl(this._extractFilterValues('uploadedBy')),
    });

    this.data.filters.typeDrawingStatus.forEach((filter) => {
      const formControlName = this.generateFormControlName(filter.type);
      this.filters.addControl(formControlName, new FormControl(filter.value));
    });
  }

  ngOnInit(): void {}

  resetFilters() {
    this.filters.reset();
  }

  handleFormSubmit() {
    const filterFormValue = this.filters.value;

    const {
      category,
      uploadedBy,
      searchQuery,
    } = filterFormValue;

    const typeDrawingStatus = this.data.filters.typeDrawingStatus.map((value, key) => {
      const formKey = this.generateFormControlName(value.type);

      return {
        type: value.type,
        label: value.label,
        value: filterFormValue[formKey]
      }
    });

    this.onFormSubmit.emit({
      category,
      uploadedBy,
      searchQuery,
      typeDrawingStatus,
    });

    this.dialogRef.close();
  }

  // Make this a filter
  toCamelCase(string) {
    return _.camelCase(string);
  }

  capitalize(string) {
    return _.startCase(string)
  }

  private _extractFilterValues(key) {
    return this.data && this.data.filters ? this.data.filters[key] : '';
  }

  generateFormControlName(typeId) {
    return `status_${typeId}`;
  }
}

export interface DrawingFiltersDialogData {
  filters: DrawingFilters;
  categories: ProjectCategory[];
}
