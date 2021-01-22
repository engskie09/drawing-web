import { Component, OnInit, ViewChild, Inject, ɵCompiler_compileModuleSync__POST_R3__, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DrawingService } from '../shared/drawing.service';
import { Observable, Subscription } from 'rxjs';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';

interface DialogData {
  drawing: object,
  view: boolean,
  type?: ProjectDrawingType,
}

@Component({
  selector: 'app-edit-drawing',
  templateUrl: './edit-drawing.component.html',
  styleUrls: ['./edit-drawing.component.scss']
})
export class EditDrawingComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent
  @ViewChild('deleteConfirmation') private deleteConfirmation: SwalComponent
  @ViewChild('deleteSuccess') private deleteSuccess: SwalComponent
  @ViewChild('drawingFile') private drawingFile

  public drawing
  public view
  private title
  public drawingForm: FormGroup;
  public isDataSubmitting: boolean = false
  public updatedDrawing
  public file = new FormControl(null)
  public loading: Boolean = true;
  subscription: Subscription;
  useCurrentDrawingNo: false;


  @Output() formSubmitted: EventEmitter<any> = new EventEmitter()

  constructor(
    public dialogRef: MatDialogRef<EditDrawingComponent>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private drawingService: DrawingService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.drawing = data.drawing;
    this.view = data.view
    this.drawingForm = this.formBuilder.group({
      drawing_title_date: this._generateFormControl(this.drawing.drawing_title_date, [Validators.required]),
      drawing_no: this._generateFormControl(this.drawing.drawing_no, [Validators.required]),
      drawing_title: this._generateFormControl(this.drawing.drawing_title, [Validators.required]),
      drawing_category_id: this._generateFormControl(this.drawing.drawing_category_id, [Validators.required]),
      drawing_target_date: this._generateFormControl('', [Validators.required]),
      current_drawing_no: this._generateFormControl(this.drawing.current_drawing_no, [Validators.required]),
    });

    this.title = data.view ? "View Drawing" : "Edit Drawing";
  }

  ngOnInit() {
    this.getDrawingData();
  }

  getDrawingData() {
    this.loading = true;

    // this.loading = false;

    if(this.data.type) {
      this.drawingService.getTypeDrawingTargetDate(this.drawing.id, this.data.type.id).subscribe(res => {
        this.drawingForm.patchValue({
          drawing_target_date: res ? res.target_date : (this.drawing.drawing_target_date ? this.drawing.drawing_target_date : '')
        });
        
        this.loading = false;
      });
    }
  }

  closeDialog($event = null) {
    if($event) $event.preventDefault()
    this.dialogRef.close();
  }

  deleteDrawing($event = null) {
    if($event) $event.preventDefault()

    this.deleteConfirmation.fire()
  }

  handleDrawingDelete() {
    this.isDataSubmitting = true

    this.drawingService.deleteDrawing(this.drawing.id).subscribe(res => {
      this.isDataSubmitting = false

      this.deleteConfirmation.dismiss()
      this.deleteSuccess.fire()
      this.closeDialog()
      this.formSubmitted.emit()
    });
  }
  
  onFormSubmit(event) {
    this.isDataSubmitting = true

    event.preventDefault()
    let data = this.drawingForm.value

    const drawing_title_date = this.datePipe.transform(data.drawing_title_date, "yyyy-MM-dd")
    const drawing_target_date = this.datePipe.transform(data.drawing_target_date, "yyyy-MM-dd");
    // const drawing_file = this.file

    const form = {
      ...this.drawingForm.value,
      id: this.drawing.id,
      project_id: this.drawing.project_id,
      drawing_title_date,
      drawing_target_date,
    }

    if(this.file.value) form['drawing_file'] = this.file.value

    this.drawingService.updateDrawing(this.drawing.id, form)
      .subscribe(res => {
        this.isDataSubmitting = false
        this.updatedDrawing = res.data;
        this.successConfirmation.fire()
      })
  }

  handleFormSubmit() {
    this.closeDialog()
    this.formSubmitted.emit(this.updatedDrawing)
  }
  
  viewDrawing() {
    this.drawingService.openDrawing(this.drawing.drawing_file_upload);
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

  _generateFormControl(value, validators = []) {
    return new FormControl({value, disabled: this.view }, [...validators])
  }
}
