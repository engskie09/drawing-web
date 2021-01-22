export class ProjectDrawingType {
  id: String | Number;
  projectId: String | Number;
  type: String;
  color: String = '#ff7c00';
  order: String | Number = 0;

  constructor(
    id: String | Number,
    projectId: String | Number,
    type: String,
  ) {
    this.id = id,
    this.projectId = projectId;
    this.type = type;
  }

  setColor(color: String) {
    this.color = color;

    return this;
  }
  
  setOrder(order: String | Number) {
    this.order = order;

    return this;
  }

  toJson() {
    return {
      id: this.id,
      project_id: this.projectId,
      color: this.color,
      type: this.type,
      order: this.order,
    }
  }
}
