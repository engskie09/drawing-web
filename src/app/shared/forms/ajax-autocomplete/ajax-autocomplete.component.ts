import { Component, OnInit, Optional, Self, Input, Output, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { NgControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-ajax-autocomplete',
  templateUrl: './ajax-autocomplete.component.html',
  styleUrls: ['./ajax-autocomplete.component.scss'],
  providers: [],
})
export class AjaxAutocompleteComponent {
  onChange = (_: any) => {};
  onTouched = () => {};
  searchTermInput: FormControl;

  @Input() options;
  @Input() displayFn;
  @Input() loading;

  @Output() onSearchTermInputChange: EventEmitter<any> = new EventEmitter();
  @Output() onOptionSelected: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef,
  ) { 
    this.searchTermInput = new FormControl(null);


    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.searchTermInput.valueChanges.subscribe(searchTerm => {
      let term = searchTerm;

      if(typeof term !== 'string') {
        term = this.displayFn(term);
      }

      this.onChange(term);
    });
  }

  writeValue(value: any): void {
    this.searchTermInput.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean):void {
    if (isDisabled) {
      this.searchTermInput.disable();
    } else {
      this.searchTermInput.enable();
    }
  }

  handleOptionSelected(option: MatAutocompleteSelectedEvent) {
    this.onOptionSelected.emit(option.option.value);
  }
}
