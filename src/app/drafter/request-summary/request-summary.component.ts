import { Component, OnInit, Input } from '@angular/core';
import { DrafterRequestsService } from 'src/app/core/services/drafter-requests.service';
import { DrafterRequestsSummary } from 'src/app/core/models/drafter-requests-summary';

@Component({
  selector: 'app-request-summary',
  templateUrl: './request-summary.component.html',
  styleUrls: ['./request-summary.component.scss']
})
export class RequestSummaryComponent implements OnInit {
  loading: boolean = false;
  summary: DrafterRequestsSummary;

  @Input()
  set drafterId(id: number) {
    this._drafterId = id;

    this.getData();
  }

  get drafterId(): number {
    return this._drafterId;
  }

  private _drafterId: number;

  @Input()
  set projectId(id: Number) {
    this._projectId = id; 

    this.getData();
  }

  get projectId(): Number {
    return this._projectId;
  }

  private _projectId: Number;


  constructor(
    private drafterRequest: DrafterRequestsService,
  ) {}

  ngOnInit(): void {}

  getData() {
    this.loading = true;

    if(this.projectId && this.drafterId) {
      this.drafterRequest.getSummary(this.drafterId, this.projectId).subscribe(res => {
        this.summary = res;
  
        this.loading = false;
      });
    }
  }
}
