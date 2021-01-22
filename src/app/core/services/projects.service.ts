import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectAdapter, ClientAdapter } from '../adapters';
import { TransmittalForm } from '../models/transmittal-form';

@Injectable()
export class ProjectsService {
  constructor(
    private api: ApiService,
    private projectAdapter: ProjectAdapter,
    private clientAdapter: ClientAdapter,
  ) {}

  // TODO: Add projects model
  getProjects(): Observable<any> {
    return this.api.get('/projects').pipe(map(res => {
      return res.data.map(project => {
        return this.projectAdapter.adapt(project)
      })
    }));
  }

  getProject(id): Observable<any> {
    return this.api.get(`/projects/${id}`).pipe(map(res => {
      return this.projectAdapter.adapt(res.data);
    }));
  }

  getClient(id): Observable<any> {
    return this.api.get(`/projects/${id}/client`).pipe(map(res => {
      if(res.data) {
        const {
          client_name,
          client_address,
          client = {},
        } = res.data;

        return this.clientAdapter.adapt({
          client_name,
          client_address,
          ...client,
        });
      }

      return;
    }));
  }

  getProjectDrawingTypeSummary(id): Observable<any> {
    return this.api.get(`/type-drawings/summary/${id}`).pipe(map(res => {
      const keys = Object.keys(res.data);
      return keys.map((key) => {
        return {
          ...res.data[key],
          type: key
        }
      })
    }));
  }

  getLatestTransmittalFile(id): Observable<any> {
    return this.api.get(`/projects/${id}/transmittal-forms/latest`)
      .pipe()
  }
}