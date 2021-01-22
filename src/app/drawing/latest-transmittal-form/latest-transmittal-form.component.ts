import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { Client } from 'src/app/core/models/client';

@Component({
  selector: 'app-latest-transmittal-form',
  templateUrl: './latest-transmittal-form.component.html',
  styleUrls: ['./latest-transmittal-form.component.scss']
})
export class LatestTransmittalFormComponent implements OnInit {
  private _projectId;
  loading: boolean = false;
  latestTransmittalForm;
  client: Client;

  @Input()
  set projectId(value) {
    if(value) {
      this._projectId = value;
      this.getData();
    }
  }

  get projectId() {
    return this._projectId;
  }

  get latestTransmittalFormNumber() {
    const clientRefFormat = this.client ? this.client.refFormat : '';
    
    if(this.latestTransmittalForm) {
      return this.latestTransmittalForm.ref_no.replace(clientRefFormat, '');
    } else {
      return '-';
    }
  }

  constructor(
    private projectService: ProjectsService,
  ) {}

  ngOnInit(): void {}

  getData() {
    this.loading = true;

    this.projectService.getClient(this.projectId)
      .pipe(switchMap((client: Client) => {
        this.client = client;
        return this.projectService.getLatestTransmittalFile(this.projectId)
      })).subscribe(res => {
        this.latestTransmittalForm = res.data;
      })
  }
}
