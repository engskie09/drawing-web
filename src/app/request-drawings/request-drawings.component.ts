import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignDrawingsComponent } from './assign-drawings/assign-drawings.component';
import { Drafter } from '../core/models/drafter';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FeaturedDraftersComponent } from './featured-drafters/featured-drafters.component';
import { DrafterTasksComponent } from './drafter-tasks/drafter-tasks.component';
import { FeaturedRequestsComponent } from './featured-requests/featured-requests.component';
import { RequestDrawingComponent } from './request-drawing/request-drawing.component';
import { DraftersComponent } from './drafters/drafters.component';
import { RequestsComponent } from './requests/requests.component';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectConfigurationService } from '../core/services/project-configuration.service';
import { switchMap } from 'rxjs/operators';
import { ProjectDrawingType } from '../core/models/project-drawing-type';

@Component({
  selector: 'app-request-drawings',
  templateUrl: './request-drawings.component.html',
  styleUrls: ['./request-drawings.component.scss']
})

export class RequestDrawingsComponent implements OnInit {
  @ViewChild('successConfirmation') private successConfirmation: SwalComponent;
  @ViewChild('featuredDrafters') private featuredDrafters: FeaturedDraftersComponent;
  @ViewChild('featuredRequests') private featuredReqests: FeaturedRequestsComponent;
  @ViewChild('drafterTasks') private drafterTasks: DrafterTasksComponent;


  selectedDrafter: Drafter = null;
  isDrafterTasksLoading: Boolean = false;
  test = new FormControl(null);
  projectId: number | string;
  drawingTypes: Array<ProjectDrawingType>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private projectConfigService: ProjectConfigurationService,
  ) { }

  ngOnInit(): void {
    this.isDrafterTasksLoading = true;
  }

  openAssignDrawings() {
    const assignDialog = this.dialog.open(AssignDrawingsComponent, {
      width: '100%'
    });

    assignDialog.componentInstance.onAssignSuccess.subscribe(() => this.onAssignDrawingsSuccess());
  }

  handleDrafterClicked(drafter: Drafter) {
    this.selectedDrafter = drafter;

    this.isDrafterTasksLoading = false;
  }

  handleDraftersLoaded(drafters: Drafter[]) {
    if(!this.selectedDrafter) {
      this.selectedDrafter = drafters[0];

      this.isDrafterTasksLoading = false;
    }
  }

  onAssignDrawingsSuccess() {
    this.successConfirmation.swalOptions = {text: "Requests successfully assigned"};

    this.getAllData();

    this.successConfirmation.fire();
  }

  onRequestSaved() {
    this.successConfirmation.swalOptions = {text: "Requests successfully saved"};

    this.getAllData();

    this.successConfirmation.fire();
  }

  getAllData() {
    this.featuredDrafters.getData();
    this.featuredReqests.getData();
    this.drafterTasks.getData();
  }

  showNewRequestDrawing() {
    const newRequestDrawingDialog = this.dialog.open(RequestDrawingComponent, {
      width: '720px',
      data: {
        drafterId: this.selectedDrafter.id,
        projectId: this.projectId,
        drawingTypes: this.drawingTypes,
      }
    });

    newRequestDrawingDialog.componentInstance.onRequestSaved.subscribe(() => this.onRequestSaved());
  }

  openDrafters() {
    const draftersDialog = this.dialog.open(DraftersComponent, {
      width: '720px',
      data: {
        projectId: this.projectId,
      }
    });

    draftersDialog.componentInstance.drafterClicked.subscribe((drafter) => this.handleDrafterClicked(drafter))
  }

  openRequests() {
    const requestsDialog = this.dialog.open(RequestsComponent, {
      width: '1000px',
      data: {}
    });
  }

  handleEditRequestFormSubmit(message) {
    const alertMessage = message ? message : "Request successfully saved";

    this.successConfirmation.swalOptions = {text: alertMessage};

    this.getAllData();

    this.successConfirmation.fire();
  }
}
