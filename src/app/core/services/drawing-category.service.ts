import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { DrawingCategoryAdapter } from '../adapters/drawing-category-adapter';
import { map } from 'rxjs/operators';


@Injectable()
export class DrawingCategoryService {
  constructor(
    private api: ApiService,
    private drawingCategoryAdapter: DrawingCategoryAdapter,
  ) {}

  getCategories(): Observable<any> {
    return this.api.get('/drawing-categories')
            .pipe(map(res => res.data.map(category => this.drawingCategoryAdapter.adapt(category))));
  }

  addCategory(body = {}): Observable<any> {
    return this.api.post('/drawing-category', body);
  }

  editCategory(id, body): Observable<any> {
    return this.api.post(`/drawing-category/${id}/update`, body);
  }

  deleteCategory(id): Observable<any> {
    return this.api.delete(`/drawing-category/${id}/delete`);
  }
}