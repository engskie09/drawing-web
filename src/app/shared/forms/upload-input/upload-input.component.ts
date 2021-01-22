import { Component, OnInit, Input, Optional, Self, ElementRef, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgControl, FormControl, ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: UploadInputComponent}],
  host: {
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class UploadInputComponent implements ControlValueAccessor, MatFormFieldControl<File>, OnInit, OnDestroy {
  static nextId = 0;

  @ViewChild('fileInput') fileInput: ElementRef;
  focused = false
  id = `drawing-category-select-${UploadInputComponent.nextId++}`;
  selectedFile: File = null;
  stateChanges = new Subject<void>()
  errorState = false
  describedBy = ''


  @Input()
  get value(): File | null {
    if (this.selectedFile) {
      return this.selectedFile;
    }

    return null
  }
  set value(file: File | null) {
    this.selectedFile = file;
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  public _placeholder: string;

  get empty() {
    return !this.selectedFile
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

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.selectedFile = file;

    this.onChange(this.selectedFile)
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>,
    private fm: FocusMonitor
  ) {

    // Replace the provider from above with this.
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(_elementRef, true).subscribe(origin => {
      this.focused = !!origin
      this.stateChanges.next()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this._elementRef.nativeElement);
  }

  onContainerClick(event: MouseEvent) {
    return null;
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  writeValue(value: File) {
    this.selectedFile = value
    this.stateChanges.next()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  chooseFile() {
    this.fileInput.nativeElement.click();
  }
}
