import { Component, OnInit, Input } from '@angular/core';
import { DrawingService } from '../shared/drawing.service';
import { ProjectDrawingType } from 'src/app/core/models/project-drawing-type';

@Component({
  selector: 'app-drawing-table-drawing-target-date',
  templateUrl: './drawing-table-drawing-target-date.component.html',
  styleUrls: ['./drawing-table-drawing-target-date.component.scss']
})
export class DrawingTableDrawingTargetDateComponent implements OnInit {
  targetDate: String | Number;
  loading: Boolean = true;

  @Input() drawing;
  @Input() type: ProjectDrawingType;

  constructor(
    private drawingService: DrawingService,
  ) { }

  ngOnInit(): void {
    this.getTypeDrawingTargetDate();
  }

  getTypeDrawingTargetDate() {
    this.loading = true;
    this.drawingService.getTypeDrawingTargetDate(this.drawing.id, this.type.id).subscribe(res => {
      this.targetDate = res ? res.target_date : '';
      this.loading = false;
    });
  }

}
