import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drawing-summary',
  templateUrl: './drawing-summary.component.html',
  styleUrls: ['./drawing-summary.component.scss']
})
export class DrawingSummaryComponent {
  private _title: string;

  @Input() summary: SummaryInterface;
  @Input()
  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value.replace(/-/g, " ");
  }

  constructor() { }
}

interface SummaryInterface {
  approved: string | number;
  for_approval: string | number;
  re_submit: string | number;
  rejected: string | number;
  submitted: string | number;
  total_drawings: string | number;
  total_submitted: string | number;
  type?: string;
}