import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { DatePipe } from '@angular/common';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-drawing-request',
  templateUrl: './drawing-request.component.html',
  styleUrls: ['./drawing-request.component.scss']
})
export class DrawingRequestComponent implements OnInit {
  public drawingRequestForm: FormGroup;
  public isSubmitting: Boolean = false;

  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onApproveSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onRejectSuccess: EventEmitter<any> = new EventEmitter();

  @ViewChild('contentDiv') contentDiv: HTMLElement;
  @ViewChild('confirmApproveDrawing') confirmApproveDrawing: SwalComponent;
  @ViewChild('confirmRejectDrawing') confirmRejectDrawing: SwalComponent;

  get isView(): Boolean {
    return this.data.type === "view";
  }

  get drawingRequest(): DrawingRequest {
    return this.data.drawingRequest;
  }

  constructor(
    private dialogRef: MatDialogRef<DrawingRequestComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawingRequestDialogData,
    private drawingRequestService: DrawingRequestService,
    private datePipe: DatePipe,
  ) { 
    this.drawingRequestForm = this.formBuilder.group({
      subject: new FormControl({value: this.drawingRequest.subject, disabled: this.isView}, [Validators.required]),
      status: new FormControl({value: this.drawingRequest.status, disabled: this.isView}, [Validators.required]),
      request_date: new FormControl({value: this.drawingRequest.requestDate, disabled: this.isView}, [Validators.required]),
      target_date: new FormControl({value: this.drawingRequest.targetDate, disabled: this.isView } , [Validators.required]),
      drawing: new FormControl({value: this.drawingRequest.drawing, disabled: this.isView } , [Validators.required]),
      drawing_file: new FormControl(null),
      comments: new FormControl({value: this.drawingRequest.comments, disabled: this.isView}, {})
    });

    if(this.data.isDrafter) {
      this.drawingRequestForm.controls['status'].disable();
    }
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveDrawingRequest() {
    const {
      request_date,
      target_date,
      subject,
      status,
      drawing,
      drawing_file,
      comments,
    } = this.drawingRequestForm.value;

    const body = {
      subject,
      status,
      request_date: this.datePipe.transform(request_date, 'yyyy-MM-dd'),
      target_date: this.datePipe.transform(target_date, 'yyyy-MM-dd'),
      drawing_id: drawing.id,
      comments,
    }

    if(drawing_file) {
      body['drawing_file'] = drawing_file;
    }

    this.isSubmitting = true;
    this.drawingRequestService.editRequest(body, this.data.drawingRequest.id).subscribe(() => {
      this.isSubmitting = false;
      this.onFormSubmit.emit();
      this.closeDialog();
    });
  }

  showApproveDrawingConfirm() {
    this.confirmApproveDrawing.fire();
  }

  showRejectDrawingConfirm() {
    this.confirmRejectDrawing.fire();
  }
}

export interface DrawingRequestDialogData {
  type: string;
  drawingRequest: DrawingRequest;
  projectId?: string | number;
  isDrafter?: Boolean;
}
