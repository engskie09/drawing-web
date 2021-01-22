import { Injectable } from '@angular/core';
import { TenderDrawing } from '../models/tender-drawing';

@Injectable()
export class TenderDrawingAdapter {
  adapt(request) {
    const {
      id,
      drawing_no,
      drawing_title,
      current_drawing_no,
      drawing_target_date,
      drawing_title_date,
      drawing_file_upload,
      employee_id,
      project_id,
      category: { category_name },
      employee,
      project,
    } = request;

    const tenderDrawing: TenderDrawing =  {
      no: drawing_no,
      title: drawing_title,
      currentDrawingNo: current_drawing_no,
      id: id,
      targetDate: drawing_target_date,
      titleDate: drawing_title_date,
      drawingFile: drawing_file_upload,
      category: category_name,
      employeeId: employee_id,
      projectId: project_id,
      employeeName: employee ? `${employee.first_name} ${employee.last_name}` : '',
      projectName: project ? project.title : '',
    }

    return tenderDrawing;
  }
}