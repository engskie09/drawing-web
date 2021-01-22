import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';

@Component({
  selector: 'app-complete-drawing-request',
  templateUrl: './complete-drawing-request.component.html',
  styleUrls: ['./complete-drawing-request.component.scss']
})
export class CompleteDrawingRequestComponent implements OnInit {
  public completeDrawingForm: FormGroup;
  loading: Boolean = false;

  
  @Output() onCompleteSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:CompleteDrawingDialogData,
    private dialogRef: MatDialogRef<CompleteDrawingRequestComponent>,
    private formBuilder: FormBuilder,
    private drawingRequestService: DrawingRequestService,
  ) { 
    this.completeDrawingForm = this.formBuilder.group({
      completed_drawing_file: new FormControl(null, [Validators.required]),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  onFormSubmit() {
    const body = this.completeDrawingForm.value;

    this.loading = true;

    this.drawingRequestService.completeRequest(this.data.drawingRequestId, body).subscribe(res => {
      this.closeDialog();
      this.onCompleteSuccess.emit();

      this.loading = false;
    });
  }

}

export interface CompleteDrawingDialogData {
  drawingRequestId: number | string;
}
