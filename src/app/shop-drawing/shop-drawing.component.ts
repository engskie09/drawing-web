import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DrawingService } from '../drawing/shared/drawing.service';
import { TypeDrawingService } from '../core/services/type-drawing.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop-drawing',
  templateUrl: './shop-drawing.component.html',
  styleUrls: ['./shop-drawing.component.scss']
})
export class ShopDrawingComponent implements OnInit {
  shopDrawing;

  get drawingTitle(): string {
    return this.shopDrawing && this.shopDrawing.drawing_no ? this.shopDrawing.drawing_no : this.shopDrawing.drawing.drawing_no;
  }

  constructor(
    private route: ActivatedRoute,
    private typeDrawingService: TypeDrawingService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((res: ParamMap) => {
      const id = res.get('drawingId');
      return this.typeDrawingService.getShopDrawing(id);
    })).subscribe(res => {
      this.shopDrawing = res.data;
    });
  }

}
