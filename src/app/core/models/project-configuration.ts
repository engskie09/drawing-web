import { ProjectDrawingType } from './project-drawing-type';

export class ProjectConfiguration {
  drawingTypes: Array<ProjectDrawingType> = [];

  constructor(
    drawingTypes: Array<ProjectDrawingType>,
  ) {
    this.drawingTypes = drawingTypes;
  }
}