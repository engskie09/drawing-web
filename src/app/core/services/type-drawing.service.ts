import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TypeDrawingService {
  constructor(
    public api: ApiService,
    private datePipe: DatePipe,
  ) {}

  getTypeDrawing(id) {
    return this.api.get(`/type-drawing/${id}`);
  }

  getShopDrawing(id) {
    return this.api.get(`/type-drawing/${id}?type=shop`);
  }

  getAsBuiltDrawing(id) {
    return this.api.get(`/type-drawing/${id}?type=as-built`);
  }

  getHistory(id, type, date = '') {
    return this.api.get(`/type-drawing/history/${id}`);
  }

  getHistoryDates(id, type) {
    return this.api.get(`/type-drawing/history/${id}/dates?type=${type}`).pipe(map(res => {
      return res.data.map(date => {
        return this.datePipe.transform(date, 'dd-MM-yyy')
      });
    }));;
  }
}