import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDrawingComponent } from '../request-drawings/request-drawing/request-drawing.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestsTableComponent } from './requests-table/requests-table.component';
import { RequestSummaryComponent } from './request-summary/request-summary.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-drafter',
  templateUrl: './drafter.component.html',
  styleUrls: ['./drafter.component.scss']
})
export class DrafterComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent;
  @ViewChild('requestsTable') private requestsTable: RequestsTableComponent;
  @ViewChild('summary') private summary: RequestSummaryComponent;

  employeeId;
  projectId;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.projectId = params.get('id');

        return this.userService.currentUser;
      })
    ).subscribe(user => {
      this.employeeId = user.employeeId;
    })
  }
  
  handleOnCompleteSuccess() {
    this.successConfirmation.swalOptions = {
      text: 'Drawing marked completed.'
    }

    this.summary.getData();

    this.successConfirmation.fire();
  }

  showNewRequestDrawing() {
    const newRequestDrawingDialog = this.dialog.open(RequestDrawingComponent, {
      width: '720px',
      data: {
        drafterId: this.employeeId,
        isDrafter: true,
        projectId: this.projectId,
      }
    });

    newRequestDrawingDialog.componentInstance.onRequestSaved.subscribe(() => {
      this.requestsTable.getData();
      this.successConfirmation.swalOptions = {
        text: 'Drawing request created.'
      }
      this.summary.getData();

      this.successConfirmation.fire();
    });
  }
}
