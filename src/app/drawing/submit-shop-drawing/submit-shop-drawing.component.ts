import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DrawingService } from '../shared/drawing.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { valueNotEqualTo } from 'src/app/shared/forms/value-not-equal-to.directive';
import { DrawingStatus } from 'src/app/core/enums/drawing-status.enum';
import { DrawingRequestStatus } from 'src/app/core/enums/drawing-request-status.enum';

// TODO: Change file name for this file so that it encompasses both the shop and
// as-built drawings
@Component({
  selector: 'app-submit-shop-drawing',
  templateUrl: './submit-shop-drawing.component.html',
  styleUrls: ['./submit-shop-drawing.component.scss']
})
export class SubmitShopDrawingComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent
  @ViewChild('drawingFile') private drawingFile
  @ViewChild('transmittalFile') private transmittalFile
  drawingForm: FormGroup;
  approvers: Observable<any>
  previousStatus: string;
  isDataSubmitting: Boolean;
  drawingRef;
  loading: Boolean = true;

  get forClient(): boolean {
    if (this.drawingRef) {
      if(this.data.action !== 'edit') {
        const status = ['submit', 'resubmit'];
        const drawingStatus = ['Submitted', 'ReSubmitted'];
  
        return status.indexOf(this.data.action) === -1 || drawingStatus.indexOf(this.drawingRef.status) === -1;
      } else {
        const drawingStatus = ['Submitted', 'ReSubmitted'];

        return drawingStatus.indexOf(this.drawingRef.status) !== -1;
      }
    }

    return false;
  }

  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter()

  constructor(
    public dialogRef: MatDialogRef<SubmitShopDrawingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShowDrawingDialogData,
    private formBuilder: FormBuilder,
    private drawingService: DrawingService,
    private datePipe: DatePipe
  ) { 

    this.drawingRef = this.data.type_drawings.find(typeDrawing => {
      return typeDrawing.type_id === this.data.type_id;
    });


    const isView = this.data.action === 'view';

    const drawingRevisionValue = this.data.action === 'resubmit' ? '' : (this.drawingRef ? this.drawingRef.drawing_revision_no : '') 
    const drawingRevisionValidators = this.data.action === 'resubmit' ? [valueNotEqualTo(this.drawingRef.drawing_revision_no)] : []
    const drawing_revision_no = new FormControl(drawingRevisionValue, [
      ...drawingRevisionValidators,
      Validators.required,
    ])

    const editValidators = this.data.action === 'edit' ? [] : [Validators.required];
    const drawingTransmittalNo= this.data.action !== 'approve' && this.drawingRef ? this.drawingRef.drawing_client_transmittal_no : '';
    const fileInputValidators = this.data.action == 'edit' ? [] : [Validators.required]

    // TODO: Find a better way of doing this.
    this.drawingForm = this.formBuilder.group({
      drawing_no: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_no ?  this.drawingRef.drawing_no : this.data.current_drawing_no, [], isView),
      drawing_title: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_title ? this.drawingRef.drawing_title : '', [], isView),
      drawing_target_date: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_target_date ? this.datePipe.transform(this.drawingRef.drawing_target_date, 'dd-MM-yyyy') : this.datePipe.transform(new Date(), 'dd-MM-yyyy'), [], isView),
      drawing_title_date: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_title_date ? this.drawingRef.drawing_title_date : new Date(), [Validators.required], isView),
      drawing_submission_comment: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_submission_comment ? this.drawingRef.drawing_submission_comment : '', [Validators.required], isView),
      drawing_revision_no: this._generateFormControl(drawingRevisionValue, [...drawingRevisionValidators, Validators.required], isView),
      drawing_submission_date: this._generateFormControl(this.drawingRef && this.drawingRef.drawing_submission_date ? this.drawingRef.drawing_submission_date : new Date(), [Validators.required], isView),
      drawing_file: this._generateFormControl(null, fileInputValidators, isView),
      submitted_transmittal_form: this._generateFormControl(null, [], isView),
      drawing_client_transmittal_no: this._generateFormControl('', this.data.action === 'approve' ? [Validators.required] : [], isView),
      drawing_client_transmittal_file_upload: this._generateFormControl(null, fileInputValidators, isView),
      // drawing_target_date: this._generateFormControl('' : new Date(), this.data.type === 'shop' ? [Validators.required] : [], isView),
      approver: this._generateFormControl(this.drawingRef ? this.drawingRef.approved_by : '', [Validators.required], isView),
      drawing_returned_date: this._generateFormControl(new Date(), [Validators.required], isView)
    });

    if(this.drawingRef) {
      this.previousStatus = this.drawingRef.status;
    }
  }

  ngOnInit() {
    this.approvers = this.drawingService.getApprovers('shop', this.data.projectId).pipe(
      map(res => res.data)
    );

    if(this.data.nextDrawingType) {
      this.loading = true;
      this.drawingService.getTypeDrawingTargetDate(this.data.id, this.data.nextDrawingType.id)
        .subscribe(res => {
          this.drawingForm.addControl('drawing_next_type_target_date', new FormControl({
            value: res ? res.target_date : '',
            disabled: this.data.action === 'view'
          }, [Validators.required]));
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  handleCancelClicked($event) {
    $event.preventDefault()


    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close()
  }

  viewDrawingFile() {
    this.drawingService.openDrawing(this.drawingRef.drawing_file_upload)
  }

  viewTransmittal() {
    this.drawingService.openDrawing(this.drawingRef.drawing_transmittal_upload)
  }

  viewSubmittedTransmittalForm() {
    this.drawingService.openDrawing(this.drawingRef.submitted_transmittal_form)
  }

  viewSBHETransmittal() {
    this.drawingService.openDrawing(this.drawingRef.transmittal_form.file_path)
  }

  viewClientTransmittal() {
    this.drawingService.openDrawing(this.drawingRef.drawing_client_transmittal_file)
  }

  saveDrawing(event) {
    event.preventDefault()

    let data = this.drawingForm.getRawValue();

    const actualSubmissionDate = this.datePipe.transform(data.drawing_submission_date, 'yyyy-MM-dd')

    const returnedDate = this.datePipe.transform(data.drawing_returned_date, 'yyyy-MM-dd')

    let status = 'Submitted';
    let dateKey = null;

    switch(this.data.action) {
      case 'submit':
        status = DrawingStatus.submitted
        dateKey = 'drawing_submission_date'
        break
      case 'resubmit':
        status = DrawingStatus.resubmit,
        dateKey = 'drawing_resubmission_date'
        break
      case 'approve':
        status = DrawingStatus.approved,
        dateKey = 'drawing_approved_date'
        break
      case 'reject':
        status = DrawingStatus.rejected,
        dateKey = 'drawing_rejected_date'
        break;
      case 'edit':
      case 'view':
        status = this.drawingRef.status
        break
      default:
        status = DrawingStatus.submitted
    }

    let body = {
      drawing_returned_date: returnedDate,
      drawing_submission_date: actualSubmissionDate,
      drawing_submission_comment: data.drawing_submission_comment,
      drawing_revision_no: data.drawing_revision_no,
      drawing_transmittal_no: data.drawing_transmittal_no,
      type_id: this.data.type_id,
      approved_by: data.approver,
      drawing_id: this.data.id,
      drawing_no: data.drawing_no,
      drawing_client_transmittal_no: data.drawing_client_transmittal_no,
      status,
    }

    if(dateKey) body[dateKey] = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if(data.drawing_next_type_target_date) {
      body['drawing_next_type_target_date'] = this.datePipe.transform(data.drawing_next_type_target_date, 'yyyy-MM-dd')
    }

    if (data.drawing_file) body['drawing_file'] = data.drawing_file;
    if (data.drawing_client_transmittal_file_upload) body['drawing_client_transmittal_file_upload'] = data.drawing_client_transmittal_file_upload;
    if (data.submitted_transmittal_form) body['submitted_transmittal_form_file'] = data.submitted_transmittal_form;

    this.isDataSubmitting = true
    debugger
    this.drawingService.submitTypeDrawing(this.data.type, body)
      .subscribe(res => {
        this.isDataSubmitting = false
        this.successConfirmation.fire()
      })
  }

  handleFormSubmit() {
    this.onFormSubmit.emit()
    this.dialogRef.close()
  }

  triggerUploadDrawing() {
    this.drawingFile.open()
  }

  triggerUploadTransmittal() {
    this.transmittalFile.open()
  }

  _generateFormControl(value, validators, disabled = false) {
    return new FormControl({value, disabled}, [...validators])
  }

  shouldDisplaySBHETransmittalFile() {
    if (this.drawingRef) {
      if(this.data.action !== 'edit') {
        const status = ['submit', 'resubmit'];

        return status.indexOf(this.data.action) !== -1;
      } else {
        return true;
      }
    }

    return true;
  }

  shouldDisplayClientTransmittalFile() {
    if (this.drawingRef) {
      if(this.data.action !== 'edit') {
        const status = ['approve', 'reject'];
  
        return status.indexOf(this.data.action) !== -1;
      } else {
        const status = [
          DrawingStatus.approved,
          DrawingStatus.rejected,
        ];

        return status.indexOf(this.drawingRef.status) !== -1;
      }
    }
    
    return false;
  }
}
interface ShowDrawingDialogData {
  current_drawing_no: string,
  drawing_title: string,
  drawing_no: string,
  drawing_target_date: string,
  drawingNumber: string,
  revision: string,
  actualSubmissionDate: string,
  approvedBy: string,
  comments: string,
  drawingFile: string,
  transmittalFile: string,
  type: string,
  projectId: string | number,
  id: number,
  shop_drawing: any,
  as_built_drawing: any,
  action: string,
  drawing_transmittal_no: string,
  drawing_submission_comment: '',
  status: string,
  uploaded_by: any,
  type_drawings: any,
  type_id?: any,
  drawing_type?: any;
  nextDrawingType?: any;
}
