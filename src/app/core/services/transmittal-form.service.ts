import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TransmittalFormService {
  constructor(
    private api: ApiService,
  ) {}

  createTransmittalForm(body): Observable<any> {
    return this.api.post('/transmittal-forms', body);
  }
}