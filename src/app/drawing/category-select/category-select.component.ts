import { Component, OnInit, Input, OnDestroy, HostBinding, Self, Optional, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DrawingService } from '../shared/drawing.service';
import { map } from 'rxjs/operators';
import { FormControl, NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ProjectCategoryService } from 'src/app/core/services/project-category.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CategorySelectComponent}]
})
export class CategorySelectComponent implements MatFormFieldControl<string>, OnInit, OnDestroy {
  static nextId = 0;

  @HostBinding() id = `category-select-${CategorySelectComponent.nextId++}`;
  categories$: Observable<any>;
  form;
  category = new FormControl(null);
  stateChanges = new Subject<void>();
  focused = false
  errorState = false
  controlType = 'category-select'
  touched = false;
  _projectId;
  private _placeholder: string;
  private _required = false;

  @Input() set projectId(id) {
    this._projectId = id;

    this.getProjectCategories();
  }

  get projectId() {
    return this._projectId;
  }

  @Input() shouldShowAllOption: boolean = false

  @Input()
  get value(): string | null {
    return this.category.value
  }

  set value(categoryId: string) {
    this.category.setValue(categoryId)
    this.stateChanges.next()
  }


  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.category.disable() : this.category.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get empty() {
    return !this.category.value
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  constructor(
    private drawingService: DrawingService,
    private projectDrawingService: ProjectCategoryService,
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) { 
    this.category = new FormControl(null);

    // Replace the provider from above with this.
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      console.log(origin)
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit(): void {
    this.categories$ = this.projectDrawingService.getCategories(this.projectId)
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  onContainerClick(event: MouseEvent) {
    this.focused = true
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('div').focus();
    }
  }

  onChange = (delta: any) => {};
  
  onTouched = () => {
    console.log('touched')
    this.touched = true;
  };

  getProjectCategories() {
    this.categories$ = this.projectDrawingService.getCategories(this.projectId)
  }

  writeValue(delta: any): void {
    this.category.setValue(delta);
    this.stateChanges.next()
  }

  registerOnChange(fn: (v: any) => void): void {
    this.category.valueChanges.pipe().subscribe(fn)
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
