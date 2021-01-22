import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import { FormControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-project-drawing-type-item',
  templateUrl: './project-drawing-type-item.component.html',
  styleUrls: ['./project-drawing-type-item.component.scss']
})
export class ProjectDrawingTypeItemComponent implements OnInit {
  private _drawingType: ProjectDrawingType;
  color: String;

  @Input()
  set drawingType(value: ProjectDrawingType) {
    this._drawingType = value;

    this.color = value.color;
    this.itemFormControl.setValue(value.type);
  }

  get drawingType(): ProjectDrawingType {
    return this._drawingType;
  }

  @Input()
  get edit(): boolean {
    return this.isEditing;
  }

  set edit(value: boolean) {
    this.isEditing = value ? true : false;
  }

  @Output()
  onDrawingTypeItemSave: EventEmitter<any> = new EventEmitter();

  @Output()
  onDrawingTypeDelete: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;
  itemFormControl: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  editValue() {
    this.isEditing = true;
  }

  delete() {
    this.onDrawingTypeDelete.emit({
      id: this.drawingType.id,
    });
  }

  submit() {
    this.onDrawingTypeItemSave.emit({
      id: this.drawingType.id,
      color: this.color,
      label: this.itemFormControl.value,
    });

    this.cancelEdit();
  }

  cancelEdit() {
    this.isEditing = false;
  }

  handleColorChange({ color }) {
    this.color = color.hex;
  }
}
