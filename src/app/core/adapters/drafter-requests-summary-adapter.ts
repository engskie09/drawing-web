import { Injectable } from "@angular/core";
import { DrafterRequestsSummary } from '../models/drafter-requests-summary';

@Injectable()
export class DrafterRequestsSummaryAdapter {
  adapt(res): DrafterRequestsSummary {
    return {
      assigned: res.assigned,
      completed: res.completed,
      rejected: res.rejected,
      approved: res.approved,
      total: res.total,
    }
  }
}