import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';
import { DrafterRequestsSummaryAdapter } from '../adapters/drafter-requests-summary-adapter';

@Injectable()
export class DrafterRequestsService {
  constructor(
    private api: ApiService,
    private drafterRequestSummaryAdapter: DrafterRequestsSummaryAdapter,
  ) {}

  getSummary(drafterId: number | string, projectId: Number | String) {
    const url = `/drafter/${drafterId}/tasks/summary?project_id=${projectId}`;

    return this.api.get(url).pipe(
      map(res => this.drafterRequestSummaryAdapter.adapt(res.data))
    );
  }
}