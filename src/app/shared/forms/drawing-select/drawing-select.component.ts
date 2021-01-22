import { Component, OnInit, HostBinding, Input, Optional, Self, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Drawing } from 'src/app/drawing/shared/drawing.model';
import { NgControl, FormControl, ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { debounceTime, map } from 'rxjs/operators';
import { DrawingService, DrawingParams } from 'src/app/drawing/shared/drawing.service';
import _ from 'lodash'
import { TenderDrawing } from 'src/app/core/models/tender-drawing';

@Component({
  selector: 'app-drawing-select',
  templateUrl: './drawing-select.component.html',
  styleUrls: ['./drawing-select.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: DrawingSelectComponent}],
  host: {
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class DrawingSelectComponent implements MatFormFieldControl<any>, OnDestroy {
  static nextId = 0;
  stateChanges = new Subject<void>();
  selectedDrawingId: Number | string;
  selectedDrawing: TenderDrawing;
  focused: boolean = false;
  describedBy = '';
  errorState = false;
  searchTermInput: FormControl;
  subject = new Subject();
  options: TenderDrawing[] = [];
  loading: boolean = false;
  shouldShowOptions = false;

  @HostBinding() id = `drawing-select-${DrawingSelectComponent.nextId++}`;

  @Input() projectId;
  @Input() sbheDrawings: boolean = true;
  @Input() clientDrawings: boolean = true;

  @Input()
  get value(): TenderDrawing {
    return this.selectedDrawing;
  }

  set value(value: TenderDrawing) {
    if(value) {
      this.searchTermInput.setValue(value.currentDrawingNo);
      this.selectedDrawing = value;
      this.onChange(value);
    }
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  get empty() {
    return !this.searchTermInput.value;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  public _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  public _disabled = false;

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>,
    private fm: FocusMonitor,
    private drawingService: DrawingService,
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.searchTermInput = new FormControl('');

    this.searchTermInput.valueChanges.subscribe((searchTerm: string | TenderDrawing )=> {
      this.loading = true;
      let term = searchTerm;

      if(typeof searchTerm !== 'string' && searchTerm) {
        term = searchTerm.currentDrawingNo;
      }

      this.search(term);
    });

    this.search = _.debounce(this.search, 700);
  }

  ngOnInit(): void {}

  ngOnDestroy():void {
    this.stateChanges.complete();
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  writeValue(drawing: TenderDrawing) {
    if(drawing) {
      this.searchTermInput.setValue(drawing);
      this.selectedDrawingId = drawing.no;
      this.selectedDrawing = drawing;
    }
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  search(searchTerm) {
    if(searchTerm) {
      const params: DrawingParams = {
        drawing_no: searchTerm,
        sbhe_drawings: this.sbheDrawings,
        client_drawings: this.clientDrawings,
      }

      this.drawingService.getTenderDrawings(this.projectId, params).subscribe(res => {
        this.options = res;
        this.loading = false;
      });
    } else {
      this.options = [];
      this.loading = false;
    }
  }

  handleClick(event) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  displayFn(option: TenderDrawing) {
    if(option) { return option.currentDrawingNo }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.searchTermInput.disable();
  }

  onOptionSelected($event) {
    this.selectedDrawing = $event.option.value;
    const option = $event.option.value;

    this.onChange(option);
  }
}
