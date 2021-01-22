import { Component, OnDestroy, OnInit, Input, Optional, Self, ElementRef, forwardRef } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { DrawingService } from '../shared/drawing.service';
import { FormBuilder, FormControl, NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';


class DrawingCategory {
  constructor(public categoryId: number, categoryName: string) { }
}

@Component({
  selector: 'app-drawing-category-select',
  templateUrl: './drawing-category-select.component.html',
  styleUrls: ['./drawing-category-select.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: DrawingCategorySelectInput, 
  }],
  host: {
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class DrawingCategorySelectInput implements MatFormFieldControl<number>, OnInit, ControlValueAccessor{
  static nextId = 0;

  stateChanges = new Subject<void>()
  categories$: Array<any> = []
  focused = false
  id = `drawing-category-select-${DrawingCategorySelectInput.nextId++}`;
  selectedId
  errorState = false
  describedBy = ''
  isLoading = false
  myControl = new FormControl()
  filteredOptions: Observable<Object[]>
  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};


  get empty() {
    return !this.selectedId
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  public _placeholder: string;

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

  @Input()
  get value(): number | null {
    if (this.selectedId) {
      return this.selectedId
    }

    return null
  }

  set value(category: number | null) {
    // const { categoryId } = category || new DrawingCategory(0)
    this.selectedId = category
  }

  constructor(
    private drawingService: DrawingService,
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>,
    private fm: FocusMonitor
  ) {
    this.selectedId = new FormControl(0)
    fm.monitor(_elementRef, true).subscribe(origin => {
      this.focused = !!origin
      console.log(this.shouldLabelFloat)
      this.stateChanges.next()
    })

    // Replace the provider from above with this.
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.isLoading = true
    this.drawingService.getCategories().subscribe(res => {
      this.categories$ = res.data
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      this.isLoading = false
    })
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  _filter(value: String): Object[] {
    const filterValue  = value.toLowerCase()

    const categories = this.categories$.filter(category => category.category_name.toLowerCase().includes(filterValue))

    return categories
  }
  

  writeValue(value: number) {
    this.selectedId = value
    this.stateChanges.next()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
