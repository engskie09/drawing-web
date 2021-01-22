import { Injectable } from "@angular/core";
import { DrawingCategory } from '../models/drawing-category';

@Injectable()
export class DrawingCategoryAdapter {
  adapt(request): DrawingCategory {
    const {
      category_name
    } = request;

    return {
      id: request.id,
      name: category_name,
    }
  }
}