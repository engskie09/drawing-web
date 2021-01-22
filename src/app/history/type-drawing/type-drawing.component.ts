import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HistoryFilters } from 'src/app/core/models/history-filters';
import { TypeDrawingService } from 'src/app/core/services/type-drawing.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-type-drawing',
  templateUrl: './type-drawing.component.html',
  styleUrls: ['./type-drawing.component.scss']
})
export class TypeDrawingComponent implements OnInit {
  loading: boolean = false;
  drawingId: string;
  include: string[];
  _filterValue: HistoryFilters = {
    date: null,
  }; 
  filters: FormControl;
  typeDrawing;
  audits = [];
  type = '';

  get filterValue(): HistoryFilters {
    return this._filterValue;
  }

  set filterValue(value: HistoryFilters) {
    this._filterValue = value;
  }

  get drawingTitle(): string {
    return this.typeDrawing && this.typeDrawing.drawing_no ? this.typeDrawing.drawing_no : this.typeDrawing.drawing.drawing_no;
  }

  constructor(
    private typeDrawingService: TypeDrawingService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loading = true

    this.route.parent.paramMap
      .pipe(switchMap((params: ParamMap) => {
        const drawingId = params.get('drawingId');
        this.drawingId = drawingId;
        return this.typeDrawingService.getHistoryDates(drawingId, this.type);
      })).subscribe((res) => {
        this.getHistory();
        
        this.loading = false;
      });
  }

  getHistory() {
    this.typeDrawingService.getHistory(this.drawingId, this.type)
      .subscribe(res => {
        this.typeDrawing = res.data;
        this.audits = res.data.audits;
      });
  }

  parseAppDateToDate(apiDate: string) {
    const parts = apiDate.split("-");

    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }

}
