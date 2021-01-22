import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TypeDrawingService } from '../core/services/type-drawing.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-type-drawing',
  templateUrl: './type-drawing.component.html',
  styleUrls: ['./type-drawing.component.scss']
})
export class TypeDrawingComponent implements OnInit {
  typeDrawing;

  get drawingTitle(): string {
    return this.typeDrawing && this.typeDrawing.drawing_no ? this.typeDrawing.drawing_no : this.typeDrawing.drawing.drawing_no;
  }

  constructor(
    private route: ActivatedRoute,
    private typeDrawingService: TypeDrawingService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((res: ParamMap) => {
      const id = res.get('drawingId');
      return this.typeDrawingService.getTypeDrawing(id);
    })).subscribe(res => {
      this.typeDrawing = res.data;
    });
  }

}
