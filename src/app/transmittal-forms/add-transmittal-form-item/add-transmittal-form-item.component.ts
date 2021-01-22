import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransmittalFormItemValues } from '../transmittal-form-item/transmittal-form-item.component';

@Component({
  selector: 'app-add-transmittal-form-item',
  templateUrl: './add-transmittal-form-item.component.html',
  styleUrls: ['./add-transmittal-form-item.component.scss']
})
export class AddTransmittalFormItemComponent implements OnInit {
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  addTransmittalFormItem: FormControl;

  constructor(
    private dialogRef: MatDialogRef<AddTransmittalFormItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddTransmittalFormItemDialogData,
  ) { 
    const initialData: TransmittalFormItemValues = {
      sn: data.currentSerialNo,
      referenceNo: '',
      qty: '',
      drawing: '',
    }

    this.addTransmittalFormItem = new FormControl(initialData, [Validators.required]);
  }

  ngOnInit(): void {}

  handleFormSubmit() {
    this.onFormSubmit.emit(this.addTransmittalFormItem.value);

    this.dialogRef.close();
  }
}

export interface AddTransmittalFormItemDialogData {
  currentSerialNo?: number | string;
  projectId?: number | string;
}
