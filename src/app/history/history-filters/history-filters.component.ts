import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { HistoryFilters } from 'src/app/core/models/history-filters';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-filters',
  templateUrl: './history-filters.component.html',
  styleUrls: ['./history-filters.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HistoryFiltersComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => HistoryFiltersComponent),
      multi: true
    }
  ]
})
export class HistoryFiltersComponent implements OnInit, ControlValueAccessor {
  date: FormControl;
  _value: HistoryFilters;

  @Input() loading: boolean;
  @Input() include: string[];

  @Input()
  get value() {
    return this._value;
  }

  set value(value: HistoryFilters) {
    this._value = value;

    if (value) {
      this.date.setValue(value.date);
    }
  }

  constructor(
    private datePipe: DatePipe
  ) { 
    this.date = new FormControl();

    this.date.valueChanges.subscribe(date => {
      const filters: HistoryFilters = {
        date,
      }
      this.onChange(filters);
    });
  }

  ngOnInit(): void {}

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value: HistoryFilters) {
    if (value) {
      this.date.setValue(value.date);
    }
  }

  filter = (d: Date | null): boolean => {
    if (this.include) {
      const date = this.datePipe.transform(d, 'dd-MM-yyyy');

      return this.include.indexOf(date) !== -1;
    }

    return true;
  }

  validate(_: FormControl) {
    return this.date.valid ? null : { filters: { valid: false, } }
  }
}
