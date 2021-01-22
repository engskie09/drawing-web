import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drafter } from 'src/app/core/models/drafter';
import { DrafterService } from 'src/app/core/services/drafter.service';

@Component({
  selector: 'app-drafters',
  templateUrl: './drafters.component.html',
  styleUrls: ['./drafters.component.scss']
})
export class DraftersComponent implements OnInit {
  public loading: Boolean = false;
  public drafters: Drafter[] = [];
  public columnsToDisplay: string[] = ['drafter', 'status', 'overview'];

  @Output() drafterClicked: EventEmitter<Drafter> = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<DraftersComponent>,
    private drafterService: DrafterService,
    @Inject(MAT_DIALOG_DATA) public data: DraftersDialogData,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.drafterService.getDrafters(true, this.data.projectId).subscribe(res => {
      this.drafters = res.data.map(drafter => {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          drawing_requests: drawingRequests,
          avatar ='',
        } = drafter;

        // TODO: Handle status in API
        const status = 'IN'

        return new Drafter({firstName, lastName, drawingRequests, status, id, avatar});
      });
      
      this.loading = false;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleDrafterClicked(drafter: Drafter) {
    this.drafterClicked.emit(drafter);
    this.dialogRef.close();
  }
}

export interface DraftersDialogData {
  projectId: number;
}
