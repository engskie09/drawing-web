import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-transmittal-form-item',
  templateUrl: './transmittal-form-item.component.html',
  styleUrls: ['./transmittal-form-item.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransmittalFormItemComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TransmittalFormItemComponent),
      multi: true
    }
  ],
})
export class TransmittalFormItemComponent implements OnInit , ControlValueAccessor{
  transmittalFormItem: FormGroup;
  @Input() projectId;

  get value(): TransmittalFormItemValues {
    return this.transmittalFormItem.value;
  }

  set value(value: TransmittalFormItemValues) {
    this.transmittalFormItem.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.transmittalFormItem = this.formBuilder.group({
      sn: new FormControl('', []),
      drawing: new FormControl('', [Validators.required]),
      referenceNo: new FormControl('', [Validators.required]),
      qty: new FormControl('', [Validators.required]),
    });

    this.transmittalFormItem.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  ngOnInit(): void {}

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.transmittalFormItem.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if(isDisabled) {
      this.transmittalFormItem.disable();
    } else {
      this.transmittalFormItem.enable();
    }
  }

  validate(_: FormControl) {
    return this.transmittalFormItem.valid ? null : { client: { valid: false, } }
  }

}
export interface TransmittalFormItemValues {
  sn?: number | string;
  qty: number | string;
  referenceNo: string;
  drawing: number | string;
}
