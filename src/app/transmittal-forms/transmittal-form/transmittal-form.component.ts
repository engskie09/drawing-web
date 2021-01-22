import { Component, OnInit, ViewChild, forwardRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTransmittalFormItemComponent, AddTransmittalFormItemDialogData } from '../add-transmittal-form-item/add-transmittal-form-item.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormArrayName, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Client } from 'src/app/core/models/client';
import { ActivatedRoute } from '@angular/router';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import { SignaturePad } from 'angular2-signaturepad';
import { User } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-transmittal-form',
  templateUrl: './transmittal-form.component.html',
  styleUrls: ['./transmittal-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransmittalFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TransmittalFormComponent),
      multi: true,
    }
  ],
})
export class TransmittalFormComponent implements OnInit, ControlValueAccessor {
  @ViewChild('itemsTable') table: MatTable<any>;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Input()
  get client() {
    return this._client;
  }

  set client(client: Client) {
    this._client = client;
    if(client) {
      this.transmittalForm.get('refNo').setValue(client.refFormat);
    }
  }

  @Input() drawingTypes: Array<ProjectDrawingType> = [];
  @Input() user: User;

  private _client: Client;

  columnsToDisplay = ['sn', 'description', 'referenceNo', 'qty', 'action'];
  dataSource = new MatTableDataSource<any>();
  projectId;

  transmittalForm: FormGroup;
  signature: string = '';
  useSavedSignature: FormControl = new FormControl();

  get value(): TransmittalFormValues {
    return this.transmittalForm.value;
  }

  set value(value: TransmittalFormValues) {
    this.transmittalForm.setValue(value);
    
    this.triggerOnChange();
  }

  get selectedClient(): Client {
    return this.transmittalForm.get('client').value;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  public signaturePadOptions: Object = {
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
  ) {
    this.transmittalForm = this.formBuilder.group({
      date: new FormControl(new Date(), [Validators.required]),
      attn: new FormControl('', [Validators.required]),
      type: new FormControl(''),
      refNo: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      for: new FormArray([
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
        new FormControl(),
      ]),
      remarks: new FormControl(''),
    });

    this.transmittalForm.valueChanges.subscribe(value => {
      this.triggerOnChange();
    });

    this.route.paramMap.subscribe(res => {
      this.projectId = res.get('id');
    });

    this.useSavedSignature.valueChanges.subscribe(value => {
      if(value) {
        this.signature = this.user.signatureLink;

        this.triggerOnChange();
      } else {
        this.signature = '';

        this.triggerOnChange();
      }
    })
  }

  ngOnInit(): void {}
  onRemove(index){
    this.dataSource.data.splice(index, 1)
    this.table.renderRows();
    this.triggerOnChange();
  }
  showAddItem() {
    const data: AddTransmittalFormItemDialogData = {
      currentSerialNo: this.dataSource.data.length,
      projectId: this.projectId,
    };

    const addItemDialog = this.dialog.open(AddTransmittalFormItemComponent, {
      width: '720px',
      data,
    });

    addItemDialog.componentInstance.onFormSubmit.subscribe(res => {
      this.dataSource.data.push(res);

      this.table.renderRows();
      this.triggerOnChange();
    });
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.transmittalForm.reset();
      this.dataSource.data = [];
      this.clearSignature();
      this.table.renderRows();
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if(isDisabled) {
      this.transmittalForm.disable();
    } else {
      this.transmittalForm.enable();
    }
  }

  validate(_: FormControl) {
    const shouldRequireSignature = this.useSavedSignature.value ? true : this.signature;

    return this.transmittalForm.valid && this.dataSource.data.length >= 1 && shouldRequireSignature ? null: { transmittalForm: { valid: false, } };
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL();

    this.triggerOnChange();
  }

  clearSignature() {
    this.signature = '';
    this.signaturePad.clear();

    this.triggerOnChange();
  }

  triggerOnChange() {
    this.onChange({
      ...this.transmittalForm.value,
      items: this.dataSource.data,
      signature: this.signature,
      useSaved: this.useSavedSignature.value,
    });
    this.onTouched();
  }
}

export interface TransmittalFormValues {
  date: Date | string,
  attn: string;
  subject: string;
  for: Array<boolean>;
  remarks?: string;
  type: string;
  refNo?: string;
  signature?: string;
  useSaved?: boolean;
}
