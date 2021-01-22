import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';
import { DrawingRequest } from '../models/drawing-request';
import { map } from 'rxjs/operators';
import { Drafter } from '../models/drafter';
import { DrawingRequestAdapter } from '../adapters/drawing-request-adapter';

@Injectable()
export class DrawingRequestService {
  private userId;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private drawingRequestAdapter: DrawingRequestAdapter,
  ) {
    this.userService.currentUser.subscribe(user => {
      this.userId = user.employeeId;
    })
  }

  createRequest(body): Observable<any> {
    const postData = {
      employee_id: this.userId,
      ...body,
    }
    return this.api.post('/drawing-requests', postData);
  }

  getRequests(project_id: string | Number = '', params: DrawingRequestParams = {}): Observable<any> {
    return this.api.get(`/drawing-requests?project_id=${project_id}&assigned_by=${params.assignedBy ? params.assignedBy : ''}&status=${params.status ? params.status : ''}`)
      .pipe(map(res => {
        return res.data.map(res => {
          return this.drawingRequestAdapter.adapt(res);
        });
      }));
  }

  assignRequests(body): Observable<any> {
    const drafter_requests = JSON.stringify(body);

    return this.api.post('/drawing-requests/assign', {
      drafter_requests: drafter_requests,
    });
  }

  editRequest(body, id): Observable<any> {
    return this.api.post(`/drawing-request/${id}/update`, body);
  }

  completeRequest(id, body): Observable<any> {
    return this.api.post(`/drawing-request/${id}/complete`, body);
  }

  approveDrawing(id, comments): Observable<any> {
    return this.api.post(`/drawing-request/${id}/approve`, {
      comments,
    })
  }

  rejectDrawing(id, comments): Observable<any> {
    return this.api.post(`/drawing-request/${id}/reject`, {
      comments,
    });
  }
}

export interface DrawingRequestParams {
  assignedBy?: string | Number;
  status?: string;
}
