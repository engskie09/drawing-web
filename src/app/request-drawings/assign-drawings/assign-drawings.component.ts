import { Component, OnInit, ViewChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Drafter } from 'src/app/core/models/drafter';
import { DrafterService } from 'src/app/core/services/drafter.service';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-assign-drawings',
  templateUrl: './assign-drawings.component.html',
  styleUrls: ['./assign-drawings.component.scss']
})
export class AssignDrawingsComponent implements OnInit {
  drafters: Array<Drafter> = [];
  loading: Boolean = false;
  taskDragLists = [];
  isSaving: Boolean = false;

  @Output() onAssignSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<AssignDrawingsComponent>,
    private drafterService: DrafterService,
    private drawingRequestService: DrawingRequestService,
  ) { 
    

    console.log(this.taskDragLists)
  }
  
  ngOnInit(): void {
    this.getDrafters();
  }

  async getDrafters() {
    this.loading = true;
    this.drafterService.getDrafters(false).subscribe(res => {
      this.drafters = res.data.map(drafter => {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          drawing_requests: drawingRequests,
          avatar = '',
        } = drafter;
  
        // TODO: Handle status in API
        const status = 'IN'
  
        return new Drafter({firstName, lastName, drawingRequests, status, id, avatar});
        });
        this.taskDragLists = this.drafters.map((drafter, index) => {
          return `drafter-${index}`
        });

        this.loading = false;
      });
  }

  closeDialog() {
    this.dialogRef.close()
  }

  saveDrawingAssignments() {
    this.isSaving = true;
    const body = this.prepareSaveDrawingAssignmentsData();

    this.drawingRequestService.assignRequests(body).subscribe(res => {
      this.isSaving = false;
      this.closeDialog();

      this.onAssignSuccess.emit();
    });
  }

  private prepareSaveDrawingAssignmentsData() {
    return this.drafters.map(drafter => {
      const drawingRequests = drafter.drawingRequests.map((request: DrawingRequest) => request.id);
      
      return {
        drafter: drafter.id,
        drawing_requests: drawingRequests,
      }
    });
  }

  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
