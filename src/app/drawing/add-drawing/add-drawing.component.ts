import { Component, OnInit, ViewChild, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DrawingService } from '../shared/drawing.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment'
import { DatePipe } from '@angular/common';
import { ProjectCategoryService } from 'src/app/core/services/project-category.service';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';

interface DialogData {
  projectId: number | string,
  type?: ProjectDrawingType,
}
@Component({
  selector: 'app-add-drawing',
  templateUrl: './add-drawing.component.html',
  styleUrls: ['./add-drawing.component.scss']
})
export class AddDrawingComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent
  @ViewChild('drawingFile') private uploadFile

  drawingForm;
  projectId;
  categories$: Observable<any>;
  addedDrawing;
  file;
  isDataSubmitting: Boolean;
  test;
  useCurrentDrawingNo: false;
  subscription: any;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter()

  constructor(
    public dialogRef: MatDialogRef<AddDrawingComponent>,
    private formBuilder: FormBuilder, 
    private drawingService: DrawingService,
    private projectCategoryService: ProjectCategoryService,
    private date: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.drawingForm = this.formBuilder.group({
      drawing_title: new FormControl('', [Validators.required]),
      drawing_title_date: new FormControl(new Date(), [Validators.required]),
      drawing_no: new FormControl('', [Validators.required]),
      drawing_category_id: new FormControl(null, [Validators.required]),
      drawing_file: new FormControl(null, [Validators.required]),
      drawing_target_date: new FormControl(new Date(), [Validators.required]),
      current_drawing_no: new FormControl('', [Validators.required]),
    })

    this.test = new FormControl(null);
    this.projectId = this.data.projectId;
  }

  ngOnInit() {
    this.categories$ = this.projectCategoryService.getCategories(this.projectId)
  }

  closeDrawing($event = null) {
    if($event) $event.preventDefault()

    this.dialogRef.close()
  }

  addDrawing() {
    this.isDataSubmitting = true
    let data = this.drawingForm.getRawValue()

    const drawing_title_date = this.date.transform(data.drawing_title_date, "yyyy-MM-dd")
    const drawing_target_date = this.date.transform(data.drawing_target_date, "yyyy-MM-dd")

    data = {
      ...data,
      drawing_title_date,
      drawing_target_date,
      project_id: this.projectId,
    }
    debugger
    this.drawingService.addDrawing(data)
      .subscribe(res => {
        this.addedDrawing = res.data;
        this.isDataSubmitting = false
        this.successConfirmation.fire()
      })
  }

  triggerUploadFile() {
    this.uploadFile.open()
  }

  handleFormSubmit() {
    this.closeDrawing()
    this.formSubmitted.emit(this.addedDrawing)
  }

  // TODO: Do this better
  onUseCurrentDrawingNoToggle(value) {
    if (value) {
      this.drawingForm.get('current_drawing_no').disable();
      this.drawingForm.get('current_drawing_no').setValue(this.drawingForm.get('drawing_no').value);
      this.subscription = this.drawingForm.get('drawing_no').valueChanges.subscribe(res => {
        this.drawingForm.get('current_drawing_no').setValue(res);
      });
    } else {
      this.drawingForm.get('current_drawing_no').enable();
      this.subscription.unsubscribe();
    }
  }
}
