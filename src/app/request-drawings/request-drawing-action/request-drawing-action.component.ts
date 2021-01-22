import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { DrawingRequest } from 'src/app/core/models/drawing-request';

@Component({
  selector: 'app-request-drawing-action',
  templateUrl: './request-drawing-action.component.html',
  styleUrls: ['./request-drawing-action.component.scss']
})
export class RequestDrawingActionComponent implements OnInit {
  comments: FormControl = new FormControl('');
  loading: boolean = false;

  @Output() onCompleteSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<RequestDrawingActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDrawingActionDialogData,
    private drawingReqeustService: DrawingRequestService,
  ) {}

  ngOnInit(): void {}

  handleFormSubmit() {
    const action = this.data.action;
    const drawingRequestId = this.data.drawingRequest.id;
    const comments = this.comments.value;
    this.loading = true;

    switch(action) {
      case 'approve':
        this.drawingReqeustService.approveDrawing(drawingRequestId, comments).subscribe((res) => {
          this.loading = false;
          this.onCompleteSuccess.emit();
          this.closeDialog();
        });
        break;
      case 'reject':
        this.drawingReqeustService.rejectDrawing(drawingRequestId, comments).subscribe((res) => {
          this.loading = false;
          this.onCompleteSuccess.emit();
          this.closeDialog();
        });
        break;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

export interface RequestDrawingActionDialogData {
  action: string;
  drawingRequest: DrawingRequest;
}
