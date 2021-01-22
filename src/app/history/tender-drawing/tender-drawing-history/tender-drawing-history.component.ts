import { Component, OnInit, Input } from '@angular/core';
import { TenderDrawing } from 'src/app/core/models/tender-drawing';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tender-drawing-history',
  templateUrl: './tender-drawing-history.component.html',
  styleUrls: ['./tender-drawing-history.component.scss']
})
export class TenderDrawingHistoryComponent implements OnInit {
  @Input() tenderDrawing: TenderDrawing;
  @Input() audits: any;

  get isCreated() {
    return this.audits && this.audits.event === 'created';
  }

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

  valueToDate = (value) => {
    return this.datePipe.transform(value, "dd-MM-yyyy");
  }
}
