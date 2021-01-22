import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';
import { ProjectConfiguration } from '../models/project-configuration';
import { Observable } from 'rxjs';
import { ProjectDrawingType } from '../models/project-drawing-type';

@Injectable()
export class ProjectConfigurationService {
  constructor(
    private api: ApiService
  ) {}

  getProjectDrawingTypes(projectId: String | Number): Observable<ProjectConfiguration> {
    return this.api.get(`/projects/${projectId}/drawing-types`).pipe(map(res => {
      const types: Array<ProjectDrawingType> = res.data.map(type => {
        const projectDrawingType = new ProjectDrawingType(type.id, projectId, type.type);

        projectDrawingType.setColor(type.color);
        projectDrawingType.setOrder(type.order);

        return projectDrawingType;
      });

      return new ProjectConfiguration(types);
    }));
  }

  updateProjectDrawingTypes(projectId: String | Number, drawingTypes: Array<ProjectDrawingType> = []): Observable<ProjectConfiguration> {
    const types = drawingTypes.map(type => {
      return type.toJson();
    });

    return this.api.post(`/projects/${projectId}/drawing-types/update`, {
      types,
    }).pipe(map(res => {
      return new ProjectConfiguration(res.types);
    }));
  }

  deleteProjectDrawingType(projectId: String | Number, typeId: String | Number) {
    return this.api.delete(`/projects/${projectId}/drawing-types/${typeId}`);
  }
}