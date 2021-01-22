import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/core/api.service';
import { environment } from 'src/environments/environment';
import { UserService, User } from 'src/app/core/services/user.service';
import { map } from 'rxjs/operators';
import { TenderDrawing } from 'src/app/core/models/tender-drawing';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { TenderDrawingAdapter } from 'src/app/core/adapters/tender-drawing-adapter';
import { DrawingFilters, TypeDrawingStatusFilter } from 'src/app/core/models/drawing-filters';
import _ from 'lodash';

@Injectable()
export class DrawingService {
  user: User;
  constructor(
      private api: ApiService,
      private userService: UserService,
      private datePipe: DatePipe,
      private tenderDrawingAdapter: TenderDrawingAdapter,
  ) { 
    this.userService.currentUser.subscribe(res => {
      this.user = res
    })
  }

  // TODO: Replace DrawingParams to Drawing Filters
  getDrawings(id = null, params: DrawingParams = {}) {
    let url = `/drawings?project_id=${id}&drawing_category_id=${params.category || ''}&drawing_no=${params.drawing_no || ''}&uploaded_by=${params.uploaded_by || ''}&query=${params.query || ''}&items=${params.items ? params.items : 50}&page=${params.page ? params.page : 1}`

    if(params.type_drawing_status) {
      params.type_drawing_status.forEach((status) => {
        if(status.value) {
          url = url + `&status_${status.type}=${status.value}`
        }
      });
    }

    return this.api.get(url);
  }

  getTenderDrawings(id = null, params: DrawingParams = {}) {
    const url = `/drawings?project_id=${id || ''}&drawing_category_id=${params.category || ''}&drawing_no=${params.drawing_no || ''}`
    return this.api.get(url).pipe(map(res => {
      return res.data.data.map(drawing => {
        const tenderDrawing: TenderDrawing = {
          no: drawing.drawing_no,
          title: drawing.drawing_title,
          targetDate: drawing.drawing_target_date,
          titleDate: drawing.drawing_title_date,
          drawingFile: drawing.drawing_file_upload,
          category: drawing && drawing.category ? drawing.category.category_name : '',
          projectId: drawing.project_id,
          employeeId: drawing.employee_id,
          id: drawing.id,
          currentDrawingNo: drawing.current_drawing_no,
        }

        return tenderDrawing;
      });
    }));
  }

  addDrawing(body: any) {
    const postData = {
      ...body,
      employee_id: this.user.employeeId
    }
    return this.api.post('/drawing', postData)
  }

  updateDrawing(id, body: any) {
    return this.api.post(`/drawing/${id}/update`, body)
  }

  deleteDrawing(id) {
    return this.api.delete(`/drawing/${id}/delete`)
  }

  getCategories() {
    return this.api.get('/drawing-categories')
  }

  getApprovers(type, projectId) {
    return this.api.get(`/type-drawings/approvers?project_id=${projectId}&type=${type}`)
  }

  submitTypeDrawing(type, body) {
    const postData = {
      ...body,
      employee_id: this.user.employeeId,
    }
    return this.api.post(`/type-drawing/save`, postData)
  }

  getDrawing(id) {
    return this.api.get(`/drawing/${id}`).pipe(map(res => {
      return this.tenderDrawingAdapter.adapt(res.data);
    }));
  }

  getHistory(drawingId, date='', type=null) {
    if(type) {
      return this.api.get(`/${type}-drawing/history/${drawingId}`)
    }

    return this.api.get(`/drawing/history/${drawingId}?date=${date ? date : ''}`)
      .pipe(map(res => {
        return {
          tenderDrawing: this.tenderDrawingAdapter.adapt(res.data),
          audits: res.data.audits,
        }
      }));
  }

  
  getTypeDrawingTargetDate(id, type) {
    const url = `/drawing/${id}/type/${type}`

    return this.api.get(url)
      .pipe(map(res => res.data));
  }


  getHistoryDates(drawingId) {
    return this.api.get(`/drawing/history/${drawingId}/dates`).pipe(map(res => {
      return res.data.map(date => {
        return this.datePipe.transform(date, 'dd-MM-yyy')
      });
    }));
  }

  getSummary(type='shop', projectId) {
    const url = `/type-drawings/summary/${projectId}?type=${type}`

    return this.api.get(url).pipe()
  }

  openDrawing(path) {
    const forceRefreshPrefix = new Date().getTime();
    const win = window.open(`${environment.s3_url}${path}?${forceRefreshPrefix}`, '_blank');
    win.focus();
  }
}

export interface DrawingParams {
  category?: string;
  drawing_no?: string;
  query?: string;
  client_drawings?: boolean;
  sbhe_drawings?: boolean;
  uploaded_by?: string;
  type_drawing_status?: Array<any>,
  items?: string | Number;
  page?: string | Number;
}