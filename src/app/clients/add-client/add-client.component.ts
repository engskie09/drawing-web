import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup;
  isLoading: Boolean = false;

  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddClientComponentData,
    private clientService: ClientsService,
    private formBuilder: FormBuilder,
  ) { 
    this.addClientForm = this.formBuilder.group({
      clientForm: new FormControl({value: '', disabled: false}, []),
    });
  }

  ngOnInit(): void {}
  
  onAddNewClientSubmit() {
    this.isLoading = true;

    const { clientForm } = this.addClientForm.value;

    const {
      name,
      country,
      city,
      address,
      zipCode: zip_code,
      refFormat: ref_format,
    } = clientForm;

    const body = {
      name,
      country,
      address,
      city,
      zip_code,
      ref_format,
      project_id: this.data.projectId,
    }

    this.clientService.addClient(body).subscribe(res => {
      this.isLoading = false;

      this.onFormSubmit.emit(res.data);
      this.dialogRef.close();
    });
  }
}

export interface AddClientComponentData {
  projectId: string;
}
