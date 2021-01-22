import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ProjectConfigurationService } from 'src/app/core/services/project-configuration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectConfiguration } from 'src/app/core/models/project-configuration';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import _ from 'lodash';

@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit {
  projectConfiguration: ProjectConfiguration;
  loading: boolean = false;
  isSubmitting: boolean = false;
  newDrawingTypes: Array<ProjectDrawingType> = [];
  isDeleting: boolean = false;

  @Output() onSaveSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialogRef<ProjectConfigurationComponent>,
    private projectConfigService: ProjectConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data: ProjectConfigurationDialogData,
  ) {}

  ngOnInit(): void {
    this.getProjectConfig();
  }
  
  getProjectConfig() {
    const { projectId } = this.data;
    this.loading = true;

    this.projectConfigService.getProjectDrawingTypes(projectId).subscribe(config => {
      this.projectConfiguration = config;

      this.loading = false;
    });
  }

  handleDrawingTypeItemSave($event) {
    const {
      id,
      color,
      label,
    } = $event;

    this.projectConfiguration.drawingTypes = this.projectConfiguration.drawingTypes.map(drawingType => {
      if(drawingType.id == id) {
        const type = new ProjectDrawingType(
          id,
          drawingType.projectId,
          label,
        );

        type.setColor(color);

        return type;
      }

      return drawingType;
    });
  }

  onDrawingTypeEditSubmit($event) {
    const { value, index } = $event;

    this.projectConfiguration.drawingTypes[index] = value;
  }

  onNewEditDrawingTypeSubmit($event, index) {
    const { id,  label, color } = $event;

    const type = new ProjectDrawingType(
      id,
      this.data.projectId,
      label,
    );

    type.setColor(color);

    this.projectConfiguration.drawingTypes.push(type);
    this.newDrawingTypes.splice(index, 1);
  }

  removeDrawingType({ id }) {
    this.isDeleting = true;

    this.projectConfigService.deleteProjectDrawingType(this.data.projectId, id).subscribe(res => {
      this.dialog.close();

      this.onSaveSuccess.emit();
    });
  }

  onDeleteNewDrawingTypeSubmit($event) {
    const { index } = $event;

    this.newDrawingTypes.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addNewDrawingTypeItem()  {
    const id = this.generateUniqueId();
    const newItem = new ProjectDrawingType(id, this.data.projectId, '');
    this.newDrawingTypes.push(newItem);
  }

  generateUniqueId() {
    const ids = this.projectConfiguration.drawingTypes.map(drawingType => drawingType.id);

    return _.max(ids) + 1;
  }

  saveConfiguration() {
    const drawingTypes = this.projectConfiguration.drawingTypes.map((drawingType, index) => {
      const type = new ProjectDrawingType(
        drawingType.id,
        drawingType.projectId,
        drawingType.type,
      ).setColor(drawingType.color)
      .setOrder(index);

      return type;
    })
    this.projectConfigService.updateProjectDrawingTypes(this.data.projectId, drawingTypes).subscribe(res => {
      this.dialog.close();

      this.onSaveSuccess.emit();
    });
  }
}

export interface ProjectConfigurationDialogData {
  projectId: String | Number;
}
