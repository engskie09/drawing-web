import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Client } from 'src/app/core/models/client';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClientsFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClientsFormComponent),
      multi: true
    }
  ],
})
export class ClientsFormComponent implements OnInit, ControlValueAccessor {
  clientForm: FormGroup;
  _client: Client = {} as Client;

  @Input() set client(client: Client) {
    this._client = client;
    if (client) {
      const value = {
        refFormat: client.refFormat ? client.refFormat : '',
        country: client.country ? client.country : '',
        city: client.city ? client.city : '',
        zipCode: client.zipCode ? client.zipCode : '',
        address: client.address ? client.address : ''      
      }

      this.clientForm.setValue(value)
    }
  }

  get client(): Client {
    return this._client;
  }

  @Input() loading: boolean;

  get value(): ClientFormValues {
    return this.clientForm.value;
  }

  get refFormat(): string {
    return this.clientForm.get('refFormat').value ? this.clientForm.get('refFormat').value  : '';
  }

  set value(value: ClientFormValues) {
    this.clientForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }


  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.clientForm = this.formBuilder.group({
      refFormat: new FormControl(this.extractClientValue("refFormat"), [Validators.required]),
      city: new FormControl(this.extractClientValue("city"), [Validators.required]),
      country: new FormControl(this.extractClientValue("country"), [Validators.required]),
      zipCode: new FormControl(this.extractClientValue("zipCode"), [Validators.required]),
      address: new FormControl(this.extractClientValue("address"), [Validators.required]),
    });

    this.clientForm.valueChanges.subscribe(value => {
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
      this.clientForm.reset();
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
      this.clientForm.disable();
    } else {
      this.clientForm.enable();
    }
  }

  validate(_: FormControl) {
    return this.clientForm.valid ? null : { client: { valid: false, } }
  }

  extractClientValue(key) {
    return this.client && this.client[key] ? this.client[key] : '';
  }
}

export interface ClientFormValues {
  name?: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  refFormat: string;
}