import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-type-drawing-history',
  templateUrl: './type-drawing-history.component.html',
  styleUrls: ['./type-drawing-history.component.scss']
})
export class TypeDrawingHistoryComponent implements OnInit {
  @Input() drawing;
  @Input() audits;

  get events() {
    const events = this.audits.map(audit => {
      return audit.event;
    });

    const eventsUnique = events.filter((event, index) => {
      return events.indexOf(event) === index;
    });

    return eventsUnique.join(', ');
  }

  get doneBy() {
    const employees = this.audits.map(audit => {
      return `${audit.user.employee.first_name} ${audit.user.employee.last_name}`
    });

    const employeeUnique = employees.filter((employee, index) => {
      return employees.indexOf(employee) === index;
    });

    return employeeUnique.join(', ');
  }

  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {}

  isUpdated(key) {
    if(this.audits) {
      return this.audits.find(audit => {
        return audit.new_values[key]
      });
    }

    return false;
  }

  extractValues(key) {
    const hasNewValues =  this.audits.filter(audit => {
      return audit.new_values[key];
    });

    return hasNewValues.map(audit => {
      return {
        time: audit.created_at,
        value: audit.new_values[key],
        auditedBy: `${audit.user.employee.first_name} ${audit.user.employee.last_name}`
      }
    });
  }

  generateDrawingFileUrl(url) {
    return `${environment.s3_url}${url}`
  }

  getApprovedBy() {
    return this.drawing.approved_by ? `${this.drawing.approved_by.first_name} ${this.drawing.approved_by.last_name}` : '';
  }

  getDrawingComment() {
    switch(this.drawing.status) {
      case 'Submitted':
        return this.drawing.drawing_submission_comment;
      case 'ReSubmitted':
        return this.drawing.drawing_resubmission_comment;
      case 'Rejected':
        return this.drawing.drawing_rejected_comment;
      case 'Approved':
        return this.drawing.drawing_approved_comment;
      default:
        return '';
    }
  }

  getUploadedBy() {
    return this.drawing.uploaded_by ? `${this.drawing.uploaded_by.first_name} ${this.drawing.uploaded_by.last_name}` : '';
  }

  valueToDate = (value) => {
    return this.datePipe.transform(value, "dd-MM-yyyy");
  }

  // extractCommentValues() {
  //   const commentKeys = [
  //     'drawing_submission_comment',
  //     'drawing_resubmission_comment',
  //     'drawing_rejected_comment',
  //     'drawing_approved_comment',
  //   ];

  //   const hasNewValues =  this.audits.filter(audit => {
  //     const keys = Object.keys(audit.new_values);

  //     commentKeys.forEach(key => {
  //       if(keys.indexOf(key) !== -1) {
  //         return true;
  //       }
  //     });
  //   });

  //   return hasNewValues.map(audit => {
  //     return {
  //       time: audit.created_at,
  //       value: audit.new_values[key],
  //       auditedBy: `${audit.user.employee.first_name} ${audit.user.employee.last_name}`
  //     }
  //   });
  // }
}
