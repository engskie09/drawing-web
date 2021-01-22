import { Injectable } from '@angular/core';
import { Drafter } from '../models/drafter';

@Injectable()
export class DrafterAdapter {
  adapt(request): Drafter {
    const {
      first_name,
      last_name,
      avatar,
      id,
      drawing_requests,
      status,
    } = request;

    const drafter = new Drafter({
      id,
      avatar,
      drawingRequests: drawing_requests,
      firstName: first_name,
      lastName: last_name,
      status,
    });

    return drafter;
  }
}