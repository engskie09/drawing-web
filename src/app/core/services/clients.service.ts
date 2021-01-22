import { Injectable } from "@angular/core";
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientAdapter } from '../adapters/client-adapter';
import { Client } from '../models/client';

@Injectable()
export class ClientsService {
  constructor(
    private api: ApiService,
    private clientAdapter: ClientAdapter,
  ) {}

  getClients(params: ClientServiceParams = {}):Observable<Client[]> {
    const url = `/clients?search_term=${params.name ? params.name : ''}`

    return this.api.get(url)
      .pipe(map(res => {
        return res.data.map(client => this.clientAdapter.adapt(client))
      }));
  }

  addClient(body): Observable<any> {
    return this.api.post('/clients', body);
  }

  editClient(id, body): Observable<any> {
    return this.api.post(`/clients/${id}/update`, body);
  }

  deleteClient(id): Observable<any> {
    return this.api.delete(`/clients/${id}/delete`);
  }
}

export interface ClientServiceParams {
  name?: string;
}