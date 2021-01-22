import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawingRequestService } from 'src/app/core/services/drawing-request.service';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { UserService, User } from 'src/app/core/services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public loading: Boolean = false;
  public requests: DrawingRequest[] = [];
  public columnsToDisplay: string[] = ['index', 'subject', 'status', 'requestDate', 'targetDate', 'drafter'];

  constructor(
    private dialogRef: MatDialogRef<RequestsComponent>,
    private drawingRequestService: DrawingRequestService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: RequestsDialogData,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    
    this.userService.currentUser
      .pipe(switchMap((user: User) => {
        return this.drawingRequestService.getRequests(this.data.projectId, {
          assignedBy: user.employeeId,
          status: 'Assigned',
        });
      })).subscribe(res => {
        const requests = res;

        this.requests = requests.reverse();

        this.loading = false;
      }); 
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

export interface RequestsDialogData {
  projectId: string | Number;
}
