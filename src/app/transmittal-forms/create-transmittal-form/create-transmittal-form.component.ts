import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransmittalFormValues } from '../transmittal-form/transmittal-form.component';
import { TransmittalFormService } from 'src/app/core/services/transmittal-form.service';
import { DatePipe } from '@angular/common';
import { TransmittalFormPurposes } from 'src/app/core/enums/transmittal-form-purpose.enum';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Client } from 'src/app/core/models/client';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectConfigurationService } from 'src/app/core/services/project-configuration.service';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import { User, UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-transmittal-form',
  templateUrl: './create-transmittal-form.component.html',
  styleUrls: ['./create-transmittal-form.component.scss']
})
export class CreateTransmittalFormComponent implements OnInit {
  transmittalForm: FormControl;
  projectId;
  isLoading: boolean = false;
  client: Client;
  submitting: boolean = false;
  recentlyCreatedTransmittalFile;
  drawingTypes: Array<ProjectDrawingType> = [];
  user: User;

  @ViewChild('successConfirmation') public successConfirmation: SwalComponent;

  constructor(
    private transmittalFormService: TransmittalFormService,
    private datePipe: DatePipe,
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private projectConfigService: ProjectConfigurationService,
    private userService: UserService,
    private router: Router
  ) {
    const defaultValues: TransmittalFormValues = {
      date: new Date(),
      attn: '',
      subject: '',
      for: [false, false, false, false, false, false, false, false],
      remarks: '',
      type: '',
      refNo: '',
    }

    this.transmittalForm = new FormControl(defaultValues)
   }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        this.projectId = id;
        return this.projectService.getClient(id);
      }),
      switchMap((client) => {
        this.client = client;

        return this.projectConfigService.getProjectDrawingTypes(this.projectId)
      }),
      switchMap((config) => {
        this.drawingTypes = config.drawingTypes;

        return this.userService.currentUser;
      })
    )
    .subscribe(user => {
      this.user = user;
    });
  }

  handleFormSubmit() {
    this.submitting = true;

    const {
      date,
      attn,
      subject,
      for: purpose,
      remarks,
      type,
      items,
      refNo,
      signature,
      useSaved,
    } = this.transmittalForm.value;

    // TODO: Purpose should be many
    const formFor = purpose.findIndex(reason => {
      return reason;
    });

    const formItems = items.map(item => {
      return {
        serial_no: item.sn + 1,
        drawing_id: item.drawing.id,
        reference_no: item.referenceNo,
        quantity: item.qty
      }
    });

    const signatureUri = useSaved ? signature : this.dataURItoBlob(signature);

    const body = {
      client_id: this.client.id,
      date: this.datePipe.transform(date, 'yyyy-MM-dd'),
      attn,
      subject,
      remarks,
      type_id: type,
      ref_no: refNo,
      items: JSON.stringify(formItems),
      for: TransmittalFormPurposes[formFor],
      created_by: this.user.employeeId,
      signature: signatureUri,
    };
    debugger
    this.transmittalFormService.createTransmittalForm(body).subscribe(res => {
      this.submitting = false;
      this.recentlyCreatedTransmittalFile = res.data;
      
      this.transmittalForm.setValue(null);
      this.successConfirmation.swalOptions = {
        text: `Transmittal Form #${this.recentlyCreatedTransmittalFile.ref_no} created`,
      }
      this.successConfirmation.fire();
    });
  }

  openFile() {
    const path = this.recentlyCreatedTransmittalFile.file_path;

    const forceRefreshPrefix = new Date().getTime();
    const win = window.open(`${environment.s3_url}${path}?${forceRefreshPrefix}`, '_blank');
    win.focus();
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});
  }
  handleBack(){
    let id = this.route.snapshot.params.id;
    this.router.navigate(['/dashboard/projects', id])
  }
}
