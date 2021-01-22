import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-clients-filters',
  templateUrl: './clients-filters.component.html',
  styleUrls: ['./clients-filters.component.scss']
})
export class ClientsFiltersComponent implements OnInit {
  searchTerm: FormControl = new FormControl();

  @Output() onSearchTermChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.searchTerm.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.onSearchTermChange.emit(value);
    });
  }

  ngOnInit(): void {}

}
