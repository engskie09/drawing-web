import { User } from '../services/user.service';
import { Drafter } from './drafter';
import { DrawingRequestBuilder } from '../builders/drawing-request-builder';
import { TenderDrawing } from './tender-drawing';
import { environment } from 'src/environments/environment';
import { ProjectDrawingType } from './project-drawing-type';

export class DrawingRequest {
  public id: string;
  public requestedBy: User;
  public assignedTo: Drafter;
  public requestDate: string;
  public targetDate: string;
  public subject: string;
  public status: string;
  public drawing: TenderDrawing;
  public drawingFile: string;
  public completedDrawingFile: string;
  public comments: string;
  public drawingType: ProjectDrawingType;

  constructor(
    drawingRequestBuilder: DrawingRequestBuilder,
  ) {
    this.id = drawingRequestBuilder.id;
    this.subject = drawingRequestBuilder.subject;
    this.requestDate = drawingRequestBuilder.requestDate;
    this.targetDate = drawingRequestBuilder.targetDate;
    this.assignedTo = drawingRequestBuilder.assignedTo;
    this.status = drawingRequestBuilder.status;
    this.requestedBy = drawingRequestBuilder.requestedBy;
    this.drawing = drawingRequestBuilder.drawing;
    this.drawingFile = drawingRequestBuilder.drawingFile;
    this.completedDrawingFile = drawingRequestBuilder.completedDrawingFile;
    this.comments = drawingRequestBuilder.comments;
    this.drawingType = drawingRequestBuilder.drawingType;
  }

  get isAssigned() {
    return this.status === "Assigned" || this.status === "Rejected";
  }

  openDrawing() {
    const forceRefreshPrefix = new Date().getTime();
    const win = window.open(`${environment.s3_url}${this.drawingFile}?${forceRefreshPrefix}`, '_blank');
    win.focus();
  }

  openCompletedDrawingFile() {
    const forceRefreshPrefix = new Date().getTime();
    const win = window.open(`${environment.s3_url}${this.completedDrawingFile}?${forceRefreshPrefix}`, '_blank');
    win.focus();
  }
}

export type DrawingRequestStatus = "Completed" | "Assigned" | "Rejected";