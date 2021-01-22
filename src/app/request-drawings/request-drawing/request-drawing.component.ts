import { Component, Inject, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { DrawingService } from 'src/app/drawing/shared/drawing.service';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import { TypeDrawingModule } from 'src/app/type-drawing/type-drawing.module';
import { TypeDrawingService } from 'src/app/core/services/type-drawing.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { ProjectConfigurationService } from 'src/app/core/services/project-configuration.service';

@Component({
  selector: 'app-request-drawing',
  templateUrl: './request-drawing.component.html',
  styleUrls: ['./request-drawing.component.scss']
})
export class RequestDrawingComponent implements OnInit {
  public requestDrawingForm: FormGroup;
  public isSubmitting: Boolean = false;
  public onRequestSaved: EventEmitter<any> = new EventEmitter();
  public drawingTypes;
  approvers;

  constructor(
    public dialogRef: MatDialogRef<RequestDrawingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDrawingDialogData,
    private formBuilder: FormBuilder,
    private drawingRequestService: DrawingRequestService,
    private drawingService: DrawingService,
    private datePipe: DatePipe,
    private projectConfigService: ProjectConfigurationService,
  ) {
    this.drawingTypes = this.data.drawingTypes;
    this.requestDrawingForm = this.formBuilder.group({
      subject: new FormControl('', [Validators.required]),
      targetDate: new FormControl(new Date(), [Validators.required]),
      drawing: new FormControl('', [Validators.required]),
      drawingFile: new FormControl('', [Validators.required]),
      typeId: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
    });

    this.requestDrawingForm.get('drawing').valueChanges.pipe(switchMap(res => {
      this.requestDrawingForm.get('typeId').setValue('');
      this.requestDrawingForm.get('typeId').disable();
      return this.projectConfigService.getProjectDrawingTypes(res.projectId)
    })).subscribe(res => {
      this.requestDrawingForm.get('typeId').enable();
      this.drawingTypes = res.drawingTypes;
    });

    if (this.data.isDrafter) {
      this.requestDrawingForm.addControl('employeeId', new FormControl('', [Validators.required]));
    }
  }

  ngOnInit() {
    if(this.data.isDrafter) {
      this.approvers = this.drawingService.getApprovers('shop', this.data.projectId).pipe(
        map(res => res.data)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  processForm() {
    this.isSubmitting = true;

    const {
      subject,
      targetDate,
      drawing,
      drawingFile,
      employeeId,
      comments,
      typeId,
    } = this.requestDrawingForm.value
    const body = {
      subject,
      target_date: this.datePipe.transform(targetDate, "yyyy-MM-dd"),
      request_date: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      drafter_id: this.data.drafterId,
      project_id: this.data && this.data.projectId ? this.data.projectId : '',
      drawing_id: drawing.id,
      drawing_file: drawingFile,
      type_id: typeId,
      comments,
    }

    if (this.data.isDrafter) {
      body['employee_id'] = employeeId;
    }
    
    this.drawingRequestService.createRequest(body).subscribe(res => {
      this.closeDialog();
      this.onRequestSaved.emit(res.data);
    });
  }
}

interface RequestDrawingDialogData {
  drafterId;
  projectId;
  isDrafter?: boolean;
  drawingTypes: Array<ProjectDrawingType>;
}
