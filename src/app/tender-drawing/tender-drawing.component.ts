import { Component, OnInit } from '@angular/core';
import { TenderDrawing } from '../core/models/tender-drawing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DrawingService } from '../drawing/shared/drawing.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tender-drawing',
  templateUrl: './tender-drawing.component.html',
  styleUrls: ['./tender-drawing.component.scss']
})
export class TenderDrawingComponent implements OnInit {
  tenderDrawing: TenderDrawing;

  constructor(
    private route: ActivatedRoute,
    private drawingService: DrawingService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((res: ParamMap) => {
      const id = res.get('drawingId');
      return this.drawingService.getDrawing(id);
    })).subscribe(res => {
      this.tenderDrawing = res;
    });
  }
}