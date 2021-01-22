import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-project-configuration-item',
  templateUrl: './project-configuration-item.component.html',
  styleUrls: ['./project-configuration-item.component.scss']
})
export class ProjectConfigurationItemComponent implements OnInit {
  @ViewChild('editInput') editInput: ElementRef;

  isEditing: boolean;
  _itemValue: string;
  itemFormControl: FormControl = new FormControl();

  @Output() onSubmit: EventEmitter<any> = new EventEmitter;
  @Output() onDelete: EventEmitter<any> = new EventEmitter;

  @Input() index;

  @Input()
  get itemValue(): string {
    return this._itemValue;
  }

  set itemValue(value: string) {
    let parsedValue = value.replace(/-/g, " ");
    const titleCaseVal = this.titleCasePipe.transform(parsedValue);
    this._itemValue = titleCaseVal;
    this.itemFormControl.setValue(titleCaseVal);
  }

  @Input()
  get edit(): boolean {
    return this.isEditing;
  }

  set edit(value: boolean) {
    this.isEditing = value ? true : false;
  }

  constructor(
    private titleCasePipe: TitleCasePipe,
  ) {
    this.itemFormControl = new FormControl();
  }

  ngOnInit(): void {}

  editValue() {
    this.isEditing = true;

    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  delete() {
    this.onDelete.emit({
      index: this.index,
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  submit() {
    setTimeout(() => {
      this.cancelEdit();
    })

    this.onSubmit.emit({
      value: this.itemFormControl.value,
      index: this.index,
    });
  }
}
