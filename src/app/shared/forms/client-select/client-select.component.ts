import { Component, OnInit, Input, HostBinding, Optional, Self, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Client } from 'src/app/core/models/client';
import { ClientBuilder } from 'src/app/core/builders/client-builder';
import { ClientsService } from 'src/app/core/services/clients.service';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ClientSelectComponent}],
  host: {
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class ClientSelectComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<Client> {
  static nextId = 0;

  describedBy = '';
  loading: boolean = false;
  options: Client[] = [];
  onChange = (_: any) => {};
  onTouched = () => {};
  errorState = false;
  autocomplete: FormControl;
  selectedClient: Client = null;
  stateChanges = new Subject<void>();
  focused: boolean = false;

  @HostBinding() id = `client-select-${ClientSelectComponent.nextId++}`;


  @Input()
  get value(): Client | null {
    if (this.selectedClient) {
      return this.selectedClient;
    }

    return null;
  }

  set value(client: Client) {
    this.selectedClient = client;
    this.autocomplete.setValue(client.name);
    this.onChange(this.selectedClient);

    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  public _required = false;


  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  public _disabled = false;

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    this.focused = true;
  }

  get empty() {
    return !this.autocomplete.value;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    public clientService: ClientsService,
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor,
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.autocomplete = new FormControl('', [Validators.required]);

    this.search = _.debounce(this.search, 700);

    this.autocomplete.valueChanges.subscribe(res => {
      this.loading = true;
      this.search(res);
    });

    this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit(): void {}

  writeValue(client: Client) {
    let term = client ? client.name : '';
    if(client) {
      this.selectedClient = client;
    }

    this.autocomplete.setValue(term);

    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  search(term) {    
    if(term) {
      this.clientService.getClients({
        name: term,
      }).subscribe(res => {
        this.options = res;
  
        this.loading = false;
      });
    } else {
      this.options = [];
      this.loading = false;
    }
  }

  displayFn(option: Client) {
    if(option) { return option.name }
  }

  onOptionSelected(option) {
    this.onChange(option);
  }
}
