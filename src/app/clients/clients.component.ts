import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl } from '@angular/forms';
import { ProjectsService } from '../core/services/projects.service';
import { map, switchMap, concatMap } from 'rxjs/operators';
import { Project } from '../core/models/project';
import { Client } from '../core/models/client';
import { ClientsService } from '../core/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  project: Project;
  successMessage: string = '';
  client: Client;
  clientForm: FormControl;
  loading: boolean = false;
  isSubmitting: boolean = false;

  @ViewChild('successConfirmation') successConfirmation: SwalComponent;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private clientService: ClientsService,
  ) { 
    this.clientForm = new FormControl();
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.paramMap.pipe(
      concatMap((res: ParamMap) => {
        const projectId = res.get('id');
        return this.projectService.getProject(projectId);
      }),
      concatMap((project) => {
        this.project = project;
        return this.projectService.getClient(project.id);
      })
    ).subscribe(client => {
      this.client = client;
      this.loading = false;
    });
  }

  handleFormSubmit() {
    const formValue = this.clientForm.value;

    const body = {
      project_id: this.project.id,
      ref_format: formValue.refFormat,
      address: formValue.address,
      city: formValue.city,
      country: formValue.country,
      zip_code: formValue.zipCode,
    }

    this.isSubmitting = true;

    this.clientService.addClient(body).subscribe(res => {
      this.isSubmitting = false;
      this.successConfirmation.fire();
    });
  }
}
