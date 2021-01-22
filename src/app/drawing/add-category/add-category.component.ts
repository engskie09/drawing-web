import { Component, OnInit, Output, EventEmitter, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DrawingCategoryService } from 'src/app/core/services/drawing-category.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProjectCategoryService } from 'src/app/core/services/project-category.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent;
  isDataSubmitting: Boolean;
  categoryForm: FormGroup;
  errors = {
    category_name: '',
  };

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onEditSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCategoryData,
    private formBuilder: FormBuilder,
    private categoryService: DrawingCategoryService,
    private projectCategoryService: ProjectCategoryService,
  ) { 
    this.categoryForm = this.formBuilder.group({
      category_name: '',
    })
  }

  ngOnInit(): void {
  }

  closeDialog($event = null): void {
    if ($event) $event.preventDefault()

    this.dialogRef.close()
  }

  onFormSubmit($event) {
    $event.preventDefault()

    this.isDataSubmitting = true

    this.projectCategoryService.addCategory(this.data.projectId, this.categoryForm.value)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const keys = Object.keys(err.error.data);

          keys.forEach(key => {
            switch(key) {
              case 'category_name':
                this.categoryForm.controls['category_name'].setErrors({
                  invalid: true,
                });

                this.errors['category_name'] = err.error.data[key][0];

                break;
            }
          });

          this.isDataSubmitting = false;
          
          return throwError(err)
        })
      )
      .subscribe(res => {
        console.log(res)
        this.isDataSubmitting = false
        this.successConfirmation.fire()
      }, (err) => {
        console.log(err.data)
      })
  }

  handleFormSubmit() {
    this.closeDialog()
    this.formSubmitted.emit() 
  }

  handleOnDeleteSuccess() {
    this.closeDialog();
    this.onDeleteSuccess.emit();
  }

  handleOnEditSuccess() {
    this.closeDialog();
    this.onEditSuccess.emit();
  }
}

interface AddCategoryData {
  projectId: String | Number;
}
