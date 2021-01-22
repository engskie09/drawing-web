import { Component, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/drawing/shared/drawing.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { HistoryFilters } from 'src/app/core/models/history-filters';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TenderDrawing } from 'src/app/core/models/tender-drawing';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tender-drawing',
  templateUrl: './tender-drawing.component.html',
  styleUrls: ['./tender-drawing.component.scss']
})
export class TenderDrawingComponent implements OnInit {
  loading: boolean = false;
  drawingId: string;
  include: string[];
  _filterValue: HistoryFilters = {
    date: null,
  }; 
  filters: FormControl;
  tenderDrawing: TenderDrawing;
  audits = [];

  get filterValue(): HistoryFilters {
    return this._filterValue;
  }

  set filterValue(value: HistoryFilters) {
    this._filterValue = value;
  }

  constructor(
    private drawingService: DrawingService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;


    this.route.parent.paramMap
      .pipe(switchMap((params: ParamMap) => {
        console.log(params)
        const drawingId = params.get('drawingId');
        this.drawingId = drawingId;
        return this.drawingService.getHistoryDates(drawingId);
      })).subscribe((res) => {
        this.include = res;

        this.getHistory()
        this.loading = false;
      });
  }

  getHistory() {
    this.drawingService.getHistory(this.drawingId)
      .subscribe(res => {
        console.log(res)
        this.tenderDrawing = res.tenderDrawing;
        this.audits = res.audits;
      });
  }

  parseAppDateToDate(apiDate: string) {
    const parts = apiDate.split("-");

    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
}
