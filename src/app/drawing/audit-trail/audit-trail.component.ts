import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawingService } from '../shared/drawing.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuditTrail, AuditEvents } from 'src/app/core/models/audit-trail';
import { User } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  isDataLoading: Boolean = false
  history: Array<any> = [];
  displayedColumns = ['id', 'event', 'keysUpdated', 'date', 'time', 'user']
  drawing;

  constructor(
    public dialogRef: MatDialogRef<AuditTrailComponent>,
    private datePipe: DatePipe,
    private drawingService: DrawingService,
    @Inject(MAT_DIALOG_DATA) public data: AuditTrailDialogData,
  ) { 
    this.drawing = data.drawing
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.isDataLoading = true

    this.drawingService.getHistory(this.data.drawing.id, this.data.type)
      .subscribe(
        res => {
          this.history = res.data.map(audit => {
            const { 
              user ,
              drawing_no,
              drawing_title,
              created_at,
              old_values,
              new_values
            } = audit

            const changedBy = new User({
              id: user.id,
              employeeId: user.employee.id,
              avatar: user.employee.avatar ? user.employee.avatar : '',
              roleId: user.employee.role_id,
              companyId: user.employee.company_id,
              firstName: user.employee.first_name,
              lastName: user.employee.last_name
            });
            const event = AuditEvents[audit.event.toUpperCase()];

            return new AuditTrail(
              drawing_no,
              drawing_title,
              created_at,
              changedBy,
              event,
              old_values,
              new_values,
            );
          });

          this.isDataLoading = false
        },
        err => {
          console.log(err)
          this.isDataLoading = false
        }
      )
  }

  closeDialog() {
    this.dialogRef.close()
  }
}

interface AuditTrailDialogData {
  drawing: {
    id: string;
    drawing_title: string;
    drawing_no: string,
  },
  type: string | null,
}
