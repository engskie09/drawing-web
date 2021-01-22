import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { ProjectCategory } from '../models/project-category';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProjectCategoryService {
  constructor(
    private api: ApiService
  ) {}

  addCategory(id, body): Observable<any> {
    const url = `/projects/${id}/categories`;

    return this.api.post(url, body);
  }

  getCategories(id) {
    const url = `/projects/${id}/categories`;

    return this.api.get(url).pipe(
      map(res => {
        return res.data.map(category => {
          const projectCategory: ProjectCategory = {
            id: category.id,
            projectId: category.project_id,
            categoryName: category.category_name,
          }

          return projectCategory;
        });
      })
    );
  }

  editCategory(id, categoryId, body): Observable<any> {
    const url = `/projects/${id}/categories/${categoryId}`;

    return this.api.post(url, body);
  }

  deleteCategory(id, categoryId): Observable<any> {
    const url = `/projects/${id}/categories/${categoryId}`;

    return this.api.delete(url);
  }
}