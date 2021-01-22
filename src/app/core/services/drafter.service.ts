import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrawingRequestAdapter } from '../adapters/drawing-request-adapter';
import { DrawingRequest } from '../models/drawing-request';
import { RequestTableFilters } from 'src/app/drafter/request-table-filters/request-table-filters.component';

@Injectable()
export class DrafterService {
  constructor(
    private api: ApiService,
    private user: UserService,
    private drawingRequestAdapter: DrawingRequestAdapter,
  ) {}

  getDrafters(withCompletedTasks: Boolean = true, project_id: string | Number = ''): Observable<any> {
    return this.api.get(`/drafters?completed_tasks=${withCompletedTasks}&project_id=${project_id}`);
  }

  getDrafter(id): Observable<any> {
    return this.api.get(`/drafter/${id}`);
  }

  getDrafterTasks(id, params: DrafterTasksParams = {}): Observable<any> {
    const projectId = params.projectId ? params.projectId : '';
    const page = params.page ? params.page : 1;
    const items = params.items ? params.items : 50;
    const filters = params.filters;

    const fromDate = filters && filters.fromDate ? filters.fromDate : '';
    const endDate = filters && filters.endDate ?  filters.endDate : '';
    const employeeId = filters && filters.employeeId ?  filters.employeeId : '';
    const searchTerm = filters && filters.searchTerm ? filters.searchTerm : '';
    const status = filters && filters.status ? filters.status : '';

    const url = `/drafter/${id}/tasks?term=${searchTerm }&project_id=${projectId}&status=${status}&date_from=${fromDate}&date_to=${endDate}&requested_by=${employeeId}&items=${items}&page=${page}`;

    return this.api.get(url)
      .pipe(map(res => {
          const drawingRequests = res.data.data.map(request => {
            return this.drawingRequestAdapter.adapt(request)
          });

          const data: DrafterTasksData = {
            data: drawingRequests,
            total: res.data.total,
            currentPage: res.data.current_page,
          }

          return data;
      }));
  }

  getDrafterAssignedTasks(id, project_id = '', params: DrafterRequestFilters = {}, pageParams: DrafterTasksParams = {}): Observable<any> {
    const page = pageParams.page ? pageParams.page : 1;
    const items = pageParams.items ? pageParams.items : 50;
    const fromDate = params.fromDate ? params.fromDate : '';
    const endDate = params.endDate ? params.endDate : '';
    const employeeId = params.employeeId ? params.employeeId : '';

    const url = `/drafter/${id}/tasks?term=${params.searchTerm ? params.searchTerm  : ''}&project_id=${project_id}&status=${params.status}&date_from=${fromDate}&date_to=${endDate}&requested_by=${employeeId}&items=${items}&page=${page}`;

    return this.api.get(url)
      .pipe(map(res => {
        const drawingRequests = res.data.data.map(request => {
          return this.drawingRequestAdapter.adapt(request)
        });

        const data: DrafterTasksData = {
          data: drawingRequests,
          total: res.data.total,
          currentPage: res.data.current_page,
        }

        return data;
      }));
  }

  private adaptDrawingRequest(res): void {
    return res.data.data.map(item => {
      return this.drawingRequestAdapter.adapt(item);
    });
  }
}

interface DrafterRequestFilters {
  searchTerm?: string;
  status?: string;
  fromDate?: string;
  endDate?: string;
  employeeId?: string | number;
}

export interface DrafterTasksParams {
  projectId?: Number | String;
  page?: Number;
  items?: Number;
  filters?: RequestTableFilters;
}

export interface DrafterTasksData {
  data: Array<DrawingRequest>,
  total: number,
  currentPage: number,
}
