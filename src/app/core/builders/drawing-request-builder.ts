import { User } from '../services/user.service';
import { DrawingRequest } from '../models/drawing-request';
import { Drafter } from '../models/drafter';
import { Drawing } from 'src/app/drawing/shared/drawing.model';
import { TenderDrawing } from '../models/tender-drawing';
import { ProjectDrawingType } from '../models/project-drawing-type';


export class DrawingRequestBuilder {
  private _id: string;
  private _subject: string;
  private _requestDate: string;
  private _targetDate: string;
  private _assignedTo: Drafter;
  private _status: DrawingRequestStatus;
  private _requestedBy: User;
  private _drawing: TenderDrawing;
  private _drawingFile: string;
  private _completedDrawingFile: string;
  private _comments: string;
  private _drawingType: ProjectDrawingType;

  constructor(
    id: string,
    subject: string,
    requestDate: string,
    targetDate: string,
  ) {
    this._id = id;
    this._subject = subject;
    this._requestDate = requestDate;
    this._targetDate = targetDate; 
    this._status = 'Assigned';
  }

  build() {
    return new DrawingRequest(this);
  }
  
  get id(): string {
    return this._id;
  }

  get subject(): string {
    return this._subject;
  }

  get requestDate(): string {
    return this._requestDate;
  }

  get targetDate(): string {
    return this._targetDate;
  }
  
  get assignedTo(): Drafter {
    return this._assignedTo;
  }

  get status(): DrawingRequestStatus {
    return this._status;
  }

  get requestedBy(): User {
    return this._requestedBy;
  }

  get drawingFile(): string {
    return this._drawingFile;
  }

  get drawing(): TenderDrawing {
    return this._drawing;
  }

  get completedDrawingFile(): string {
    return this._completedDrawingFile;
  }

  get comments(): string {
    return this._comments;
  }

  get drawingType(): ProjectDrawingType {
    return this._drawingType;
  }

  setAssignedTo(drafter: Drafter) {
    this._assignedTo = drafter;
    return this;
  }

  setStatus(status: DrawingRequestStatus) {
    this._status = status;

    return this;
  }

  setRequestedBy(user: User) {
    this._requestedBy = user;

    return this;
  }

  setDrawingFile(drawingFile: string) {
    this._drawingFile = drawingFile;
    return this;
  }

  setDrawing(drawing: TenderDrawing) {
    this._drawing = drawing;

    return this;
  }

  setCompletedDrawingFile(drawingFile: string) {
    this._completedDrawingFile = drawingFile;

    return this;
  }

  setComments(comments: string) {
    this._comments = comments;

    return this;
  }

  setDrawingType(drawingType: ProjectDrawingType) {
    this._drawingType = drawingType;

    return this;
  }
}

export type DrawingRequestStatus = "Completed" | "Assigned";
