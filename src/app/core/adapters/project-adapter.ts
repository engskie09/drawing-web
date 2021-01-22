import { Injectable } from "@angular/core";
import { Project } from '../models/project';

@Injectable()
export class ProjectAdapter {
  adapt(request): Project {
    const {
      id,
      title,
      client_name,
      client_address,
      location,
      status,
      percentage,
      manpower,
      start_date,
      end_date,
    } = request;

    const project: Project =  {
      id,
      title,
      location,
      status,
      percentage,
      manpower,
      startDate: start_date,
      endDate: end_date,
      clientName: client_name,
      clientAddress: client_address,
    }

    return project;
  }
}