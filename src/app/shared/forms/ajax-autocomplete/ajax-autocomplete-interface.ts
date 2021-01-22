export interface AjaxAutoComplete {
  displayKey: string;
  valueKey?: string;

  filter(): void;
}