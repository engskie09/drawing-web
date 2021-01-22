import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddDrawingComponent } from 'src/app/drawing/add-drawing/add-drawing.component';
import { EditDrawingComponent } from 'src/app/drawing/edit-drawing/edit-drawing.component';
import { SubmitShopDrawingComponent } from 'src/app/drawing/submit-shop-drawing/submit-shop-drawing.component';
import { MatDialog } from '@angular/material/dialog';
import { AuditTrailComponent } from '../audit-trail/audit-trail.component';
import { DrawingService } from '../shared/drawing.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectConfigurationService } from 'src/app/core/services/project-configuration.service';
import _ from 'lodash';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';
import { DrawingTableRequestDrawingComponent, DrawingTableRequestDrawingData } from '../drawing-table-request-drawing/drawing-table-request-drawing.component';

export interface Drawing {
  id: string | Number,
  title: string,
  tenderDrawingNo: string,
  targetDate: string,
  drawingNumber: string,
  revision: string,
  actualSubmissionDate: string,
  returnedDate: string,
  approvedBy: string,
  comments: string,
  drawingFile: string,
  transmittalFile: string,
  current: Object,
}

@Component({
  selector: 'app-drawing-drawing-table',
  templateUrl: './drawing-table.component.html',
  styleUrls: ['./drawing-table.component.scss']
})
export class DrawingTableComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() drawings: Array<any> = []
  @Input() projectId: string | number;
  @Input() drawingTypes: Array<ProjectDrawingType> = [];

  public isGettingConfig: boolean = false;

  @Output() onFormsSubmit: EventEmitter<any> = new EventEmitter();

  get loadingColSpan() {
    return 2 + this.drawingTypes.length;
  }

  constructor(
    public dialog: MatDialog,
    private drawingService: DrawingService,
    private projectConfigService: ProjectConfigurationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {}

  showAddDrawing(): void {
    const dialogRef = this.dialog.open(AddDrawingComponent, {
      width: '700px',
    })
  }

  showEditDrawing(drawing, view = false): void {
    const type = this.drawingTypes[0];

    const editDrawingRef = this.dialog.open(EditDrawingComponent, {
      width: '700px',
      data: {
        drawing,
        view,
        type,
      }
    })
    
    editDrawingRef.componentInstance.formSubmitted.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'edit',
      })
    })
  }

  viewTenderDrawing(drawing) {
    const type = this.drawingTypes[0];

    const editDrawingRef = this.dialog.open(EditDrawingComponent, {
      width: '700px',
      data: {
        drawing,
        view: true,
        type,
      }
    })
  }

  viewDrawing(drawing): void {
    this.drawingService.openDrawing(drawing.drawing_file_upload)
  }

  showSubmitDrawing(drawing: any, type): void {
    const nextDrawingType = this.getNextTypeDrawing(type);
    const submitDrawingRef = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id: type.id,
        drawing_type: type,
        action: 'submit',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    submitDrawingRef.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'submit',
      })
    })
  }

  getNextTypeDrawing(type) {
    let nextDrawingType = null;

    const index = this.drawingTypes.indexOf(type);

    if(index !== -1) {
      nextDrawingType = this.drawingTypes[index + 1];
    }

    return nextDrawingType;
  }

  showReSubmitDrawing(drawing, type_id): void {
    const type = this.drawingTypes.find(type => type.id === type_id);
    const nextDrawingType = this.getNextTypeDrawing(type);

    const resubmitDrawingRef = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id,
        action: 'resubmit',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    resubmitDrawingRef.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'resubmit',
      })
    })
  }

  showApprovedDrawing(drawing, type_id): void {
    const type = this.drawingTypes.find(type => type.id === type_id);
    const nextDrawingType = this.getNextTypeDrawing(type);

    const dialog = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id,
        action: 'approve',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    dialog.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'approved',
      })
    })
  }
  
  showRejectedDrawing(drawing, type_id): void {
    const type = this.drawingTypes.find(type => type.id === type_id);
    const nextDrawingType = this.getNextTypeDrawing(type);

    const dialog = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id,
        action: 'reject',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    dialog.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'reject',
      })
    })
  }

  showSubmitTypeDrawing(drawing, type):void {
    const nextDrawingType = this.getNextTypeDrawing(type);

    const submitDrawingRef = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type: type,
        action: 'submit',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    submitDrawingRef.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'shop',
        action: 'submit',
      })
    })
  }

  showDrawing(drawing, type_id) {
    const type = this.drawingTypes.find(type => type.id === type_id);
    const nextDrawingType = this.getNextTypeDrawing(type);

    const submitDrawingRef = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id,
        action: 'view',
        projectId: this.projectId,
        nextDrawingType,
      }
    })
  }

  showEditTypeDrawing(drawing, type_id) {
    const type = this.drawingTypes.find(type => type.id === type_id);
    const nextDrawingType = this.getNextTypeDrawing(type);

    const submitDrawingRef = this.dialog.open(SubmitShopDrawingComponent, {
      width: '1000px',
      data: {
        ...drawing,
        type_id,
        action: 'edit',
        projectId: this.projectId,
        nextDrawingType,
      }
    })

    submitDrawingRef.componentInstance.onFormSubmit.subscribe(res => {
      this.onFormsSubmit.emit({
        type_id,
        action: 'edit',
      })
    })
  }

  showTypeDrawing(drawing, type) {
    this.showDrawing(drawing, type)
  }

  showHistory(drawing, type=null) {
    this.dialog.open(AuditTrailComponent, {
      width: '1000px',
      data: {
        drawing: drawing,
        type,
      }
    })
  }

  getReturnedDate(drawing): string | null {
    const type = drawing.status;

    if(type === 'Submitted' || !drawing) return;
    
    switch(type) {
      case 'Approved':
        return drawing.drawing_approved_date;
      case 'Rejected':
        return drawing.drawing_rejected_date;
      default:
        return drawing.drawing_resubmission_date;
    }
  }

  drawingHasMissingFields(drawing) {
    return !drawing.drawing_no && !drawing.drawing_as_built_target_date && !drawing.drawing_revision_no;
  }

  goToHistory(drawing) {
    this.router.navigateByUrl(`/dashboard/type-drawing/${drawing.id}/history`)
  }

  goToTenderDrawingHistory(drawing) {
    this.router.navigateByUrl(`/dashboard/tender-drawing/${drawing.id}/history`)
  }

  goToShopDrawingHistory(drawing) {
    this.router.navigateByUrl(`/dashboard/shop-drawing/${drawing.id}/history`)
  }

  goToAsBuiltDrawingHistory(drawing) {
    this.router.navigateByUrl(`/dashboard/as-built-drawings/${drawing.id}/history`)
  }

  extractTypeDrawing(drawing, type) {
    const typeDrawing =  drawing.type_drawings.find(typeDrawing => {
      return typeDrawing.type_id === type;
    });
    return typeDrawing;
  }

  extractTypeDrawingTargetDate(drawing, type) {
    const typeDrawingTargetDate = drawing.type_drawing_target_dates.find(targetDate => targetDate.project_drawing_type_id === type);

    if(!typeDrawingTargetDate) {

    }

    return typeDrawingTargetDate ? 
            typeDrawingTargetDate.target_date: 
            (drawing.drawing_target_date ? drawing.drawing_target_date : '-');
  }

  generateDrawingTableHeaderClass(type) {
    return `tender-drawing__heading tender-drawing__heading--${type}`;
  }

  generateDrawingTitle(type) {
    return type.replace(/-/g, " ");
  }

  generateStatusClass(status) {
    const statusClass = _.kebabCase(status);
    return `drawing-table__status drawing-table__status--${statusClass}`;
  }

  
  showRequestDrawing(
    drawing, 
    drawingType: ProjectDrawingType
  ) {
    console.log(drawing)
    const dialogData: DrawingTableRequestDrawingData = {
      drawingId: drawing.id,
      typeId: drawingType.id,
      projectId: this.projectId,
    }

    const dialog = this.dialog.open(DrawingTableRequestDrawingComponent, {
      width: '720px', 
      data: dialogData,
    });

    dialog.componentInstance.onRequestSaved.subscribe(res => {
      this.onFormsSubmit.emit({
        type: 'request-drawing',
        action: 'create',
      })
    });
  }

  extractTypeStatus(drawing, type) {
    const condition =  drawing.drawing_requests.find(request => {
      return request.type_id === type && request.status === 'Assigned';
    });
    
    return condition ? 'Requested' : '';
  }
}
