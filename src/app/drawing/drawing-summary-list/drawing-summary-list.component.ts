import { Component, OnInit, Input } from '@angular/core';
import { ProjectConfigurationService } from 'src/app/core/services/project-configuration.service';
import { switchMap } from 'rxjs/operators';
import { ProjectConfiguration } from 'src/app/core/models/project-configuration';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-drawing-summary-list',
  templateUrl: './drawing-summary-list.component.html',
  styleUrls: ['./drawing-summary-list.component.scss']
})
export class DrawingSummaryListComponent implements OnInit {
  @Input() projectId: String | Number;

  public loading: boolean = false;
  public drawingTypeSummaries: Array<any> = [];
  public swiperConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    slidesOffsetAfter: 30,
    slidesOffsetBefore: 30,
    navigation: true,
    loop: true,
  } 

  constructor(
    private projectService: ProjectsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;

    this.projectService.getProjectDrawingTypeSummary(this.projectId).subscribe(res => {
      this.drawingTypeSummaries = res;
      this.loading = false;
    });
  }
}
