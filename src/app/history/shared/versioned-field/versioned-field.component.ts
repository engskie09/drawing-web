import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-versioned-field',
  templateUrl: './versioned-field.component.html',
  styleUrls: ['./versioned-field.component.scss']
})
export class VersionedFieldComponent {
  @Input() label: string = '';
  @Input()
  set current(current) {
    this._current = current;
  }

  get current() {
    return this.displayValue(this._current);
  }

  @Input() audits: Array<any> = [];
  @Input() textarea: boolean = false;
  @Input() displayFn;

  _current;

  displayValue(value) {
    if(this.displayFn && typeof this.displayFn === 'function') {
      return this.displayFn(value)
    }

    return value;
  }

  constructor() { }
}
