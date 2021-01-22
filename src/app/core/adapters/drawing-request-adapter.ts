import { Injectable } from '@angular/core';
import { Drafter } from '../models/drafter';
import { User } from '../services/user.service';
import { DrawingRequestBuilder } from '../builders/drawing-request-builder';
import { Drawing } from 'src/app/drawing/shared/drawing.model';
import { TenderDrawing } from '../models/tender-drawing';
import { ProjectDrawingType } from '../models/project-drawing-type';

@Injectable()
export class DrawingRequestAdapter {
  adapt(request) {
    const {
      assigned_to: assignedToUser,
      requested_by: requestedByUser,
      subject,
      request_date,
      target_date,
      status,
      drawing_file,
      completed_drawing_file,
      drawing,
      id,
      comments,
      drawing_type,
    } = request;

    const assignedTo = new Drafter({
      id: assignedToUser.id,
      firstName: assignedToUser.first_name,
      lastName: assignedToUser.last_name,
      status: 'IN',
      drawingRequests: [],
      avatar: ''
    });

    const tenderDrawing: TenderDrawing = {
      no: drawing ? drawing.drawing_no : '',
      title: drawing ? drawing.drawing_title : '',
      targetDate: drawing ? drawing.drawing_target_date : '',
      titleDate: drawing ? drawing.drawing_title_date : '',
      drawingFile: drawing ? drawing.drawing_file_upload : '',
      category: drawing && drawing.category ? drawing.category.category_name : '',
      projectId: drawing ?  drawing.project_id : '',
      employeeId: drawing ? drawing.employee_id : '',
      id: drawing ? drawing.id : '',
      currentDrawingNo: drawing ? drawing.current_drawing_no : '',
      projectName: drawing && drawing.project ? drawing.project.title : '',
    }

    const requestedBy = new User({
      id: requestedByUser.id,
      employeeId: requestedByUser.id,
      avatar: requestedByUser.avatar,
      roleId: requestedByUser.role_id,
      companyId: requestedByUser.companyId,
      firstName: requestedByUser.first_name,
      lastName: requestedByUser.last_name
    });

    const drawingType = new ProjectDrawingType(
      drawing_type ? drawing_type.id : '',
      drawing_type ? drawing_type.project_id : '',
      drawing_type ? drawing_type.type : '',
    ).setColor(drawing_type ? drawing_type.color : '' )
    .setOrder(drawing_type ? drawing_type.order : '' );

    const drawingRequest = new DrawingRequestBuilder(
      id,
      subject,
      request_date,
      target_date,
    )
    .setAssignedTo(assignedTo)
    .setStatus(status)
    .setRequestedBy(requestedBy)
    .setDrawing(tenderDrawing)
    .setDrawingFile(drawing_file)
    .setCompletedDrawingFile(completed_drawing_file)
    .setComments(comments)
    .setDrawingType(drawingType)
    .build();

    return drawingRequest;
  }
}
