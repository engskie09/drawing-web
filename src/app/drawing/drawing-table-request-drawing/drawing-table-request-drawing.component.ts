import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Drafter } from 'src/app/core/models/drafter';
import { DrafterService } from 'src/app/core/services/drafter.service';
import { DrafterAdapter } from 'src/app/core/adapters/drafter.adapter';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { DatePipe } from '@angular/common';
import { UserService, User } from 'src/app/core/services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-drawing-table-request-drawing',
  templateUrl: './drawing-table-request-drawing.component.html',
  styleUrls: ['./drawing-table-request-drawing.component.scss']
})
export class DrawingTableRequestDrawingComponent implements OnInit {
  loading: Boolean = false;
  isSubmitting: Boolean = false;
  drafters: Array<Drafter> = [];
  requestDrawingForm: FormGroup;
  onRequestSaved: EventEmitter<any> = new EventEmitter();
  

  constructor(
    public dialogRef: MatDialogRef<DrawingTableRequestDrawingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DrawingTableRequestDrawingData,
    private formBuilder: FormBuilder,
    private drafterService: DrafterService,
    private drafterAdapter: DrafterAdapter,
    private drawingRequestService: DrawingRequestService,
    private userService: UserService,
    private datePipe: DatePipe,
  ) { 
    this.requestDrawingForm = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      targetDate: new FormControl(new Date(), [Validators.required]),
      drawingFile: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      drafter: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.drafterService.getDrafters().subscribe(res => {
      this.drafters = res.data.map(drafter => {
        return this.drafterAdapter.adapt(drafter);
      });

      this.loading = false;
    });
  }

  processForm() {
    this.isSubmitting = true;

    this.userService.currentUser
      .pipe(
        switchMap(res => {
          const {
            subject,
            targetDate,
            drawingFile,
            comments,
            drafter
          } = this.requestDrawingForm.value;
      
          const body = {
            subject,
            target_date: this.datePipe.transform(targetDate, "yyyy-MM-dd"),
            request_date: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
            drafter_id: drafter,
            project_id: this.data.projectId,
            drawing_id: this.data.drawingId,
            drawing_file: drawingFile,
            type_id: this.data.typeId,
            employee_id: res.employeeId,
            comments
          }

          return this.submitData(body);
      }))
      .subscribe(res => {
        this.isSubmitting = false;
        this.dialogRef.close();
        this.onRequestSaved.emit();
      });
  }

  submitData(body) {
    return this.drawingRequestService.createRequest(body);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

export interface DrawingTableRequestDrawingData {
  drawingId: string | Number;
  typeId: String | Number;
  projectId: string | Number;
}
