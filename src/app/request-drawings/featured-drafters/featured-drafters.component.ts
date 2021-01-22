import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DrafterService } from 'src/app/core/services/drafter.service';
import { Drafter } from 'src/app/core/models/drafter';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'featured-drafters',
  templateUrl: './featured-drafters.component.html',
  styleUrls: ['./featured-drafters.component.scss']
})
export class FeaturedDraftersComponent implements OnInit {
  public loading: Boolean = false;
  public drafters: Array<Drafter> = [];
  public columnsToDisplay: string[] = ['drafter', 'status', 'overview'];
  // private _projectId;

  @Output() drafterClicked: EventEmitter<Drafter> = new EventEmitter();
  @Output() onDraftersLoaded: EventEmitter<Drafter[]> = new EventEmitter();

  // @Input() set projectId(projectId: Number | string) {
  //   if(projectId) {
  //     this._projectId = projectId;
  //     this.getData();
  //   } else {
  //     this.loading = true;
  //   }
  // }

  // get projectId(): Number | string {
  //   return this._projectId;
  // }

  constructor(
    private drafterService: DrafterService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.drafters = [];

    this.drafterService.getDrafters(true)
      .pipe(map(res => res.data))
      .subscribe(res => {
        this.drafters = res.map(drafter => {
          const {
            id,
            first_name: firstName,
            last_name: lastName,
            drawing_requests: drawingRequests,
            avatar = '',
          } = drafter;

          // TODO: Handle status in API
          const status = 'IN';

          return new Drafter({firstName, lastName, drawingRequests, status, id, avatar});
        });
        
        this.loading = false;
        this.onDraftersLoaded.emit(this.drafters);
      });
  }

  handleDrafterClicked(drafter: Drafter) {
    this.drafterClicked.emit(drafter)
  }
}
