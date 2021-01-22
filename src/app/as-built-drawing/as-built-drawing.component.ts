import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DrawingService } from '../drawing/shared/drawing.service';
import { TypeDrawingService } from '../core/services/type-drawing.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-as-built-drawing',
  templateUrl: './as-built-drawing.component.html',
  styleUrls: ['./as-built-drawing.component.scss']
})
export class AsBuiltDrawingComponent implements OnInit {
  asBuiltDrawing;

  get drawingTitle(): string {
    return this.asBuiltDrawing && this.asBuiltDrawing.drawing_no ? this.asBuiltDrawing.drawing_no : this.asBuiltDrawing.drawing.drawing_no;
  }

  constructor(
    private route: ActivatedRoute,
    private typeDrawingService: TypeDrawingService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((res: ParamMap) => {
      const id = res.get('drawingId');
      return this.typeDrawingService.getAsBuiltDrawing(id);
    })).subscribe(res => {
      this.asBuiltDrawing = res.data;
    });
  }

}
