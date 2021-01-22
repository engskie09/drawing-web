import { Component, OnInit, Input } from '@angular/core';
import { DrawingRequestService, DrawingRequestParams } from 'src/app/core/services/drawing-request.service';
import { DrawingRequest } from 'src/app/core/models/drawing-request';
import { map, switchMap } from 'rxjs/operators';
import { User, UserService } from 'src/app/core/services/user.service';
import { Drafter } from 'src/app/core/models/drafter';

@Component({
  selector: 'featured-requests',
  templateUrl: './featured-requests.component.html',
  styleUrls: ['./featured-requests.component.scss']
})
export class FeaturedRequestsComponent implements OnInit {
  public requests: DrawingRequest[] = [];
  public loading: Boolean = false;
  public columnsToDisplay: string[] = ['index', 'subject', 'status', 'drafter'];
  // private _projectId;
  private user: User;

  constructor(
    private drawingRequestService: DrawingRequestService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.loading = true;
    this.requests = [];

    this.userService.currentUser
      .pipe(switchMap(user => {
        this.user = user;

        const params: DrawingRequestParams = {
          assignedBy: this.user.employeeId,
          status: 'Assigned',
        }

        return this.drawingRequestService.getRequests('', params)
      }))
      .subscribe(res => {
        console.log(res);
        const requests = res;
        this.requests = requests.reverse();

        this.loading = false;
      });
  }
}
