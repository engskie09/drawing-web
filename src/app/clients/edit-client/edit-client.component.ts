import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientDialogData } from '../shared/client-dialog-data';
import { ClientFormValues } from '../clients-form/clients-form.component';
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  editClientForm: FormGroup;
  isLoading: Boolean = false;

  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EditClientComponent>,
    public formBuilder: FormBuilder,
    public clientsService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
  ) {
    const client = data.client;

    const value: ClientFormValues = {
      name: client.name,
      address: client.address,
      country: client.country,
      zipCode: client.zipCode,
      city: client.city,
      refFormat: client.refFormat,
    }

    this.editClientForm = this.formBuilder.group({
      clientDetails: new FormControl(value, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onEditClientSubmit() {
    this.isLoading = true;

    const { clientDetails } = this.editClientForm.value;

    const {
      name,
      country,
      city,
      address,
      zipCode: zip_code,
      refFormat: ref_format,
    } = clientDetails;

    const body = {
      name,
      country,
      address,
      city,
      zip_code,
      ref_format,
      project_id: this.data.projectId,
    }

    this.clientsService.editClient(this.data.client.id, body).subscribe(res => {
      this.isLoading = false;

      this.onFormSubmit.emit(res.data);
      this.dialogRef.close();
    });
  }
}
