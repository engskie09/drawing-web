import { Client } from '../models/client';
import { TenderDrawing } from '../models/tender-drawing';
import { TransmittalFormItem } from '../models/transmittal-form-item';

export class TransmittalFormBuilder {
  private _id: number | string;
  private _client: Client;
  private _to: string;
  private _refNo: string;
  private _subject: string;
  private _remarks: string;
  private _items: TransmittalFormItem[] = [];

  constructor(id :string) {
    this._id = id;
  }

  get id(): number | string {
    return this._id;
  }

  setId(id: string): TransmittalFormBuilder {
    this._id = id;

    return this;
  }

  get client(): Client {
    return this._client;
  }

  setClient(client: Client): TransmittalFormBuilder {
    this._client = client;
    
    return this;
  }

  get to(): string {
    return this._to;
  }

  setTo(to: string): TransmittalFormBuilder {
    this._to = to;
    
    return this;
  }

  get refNo(): string {
    return this._refNo;
  }

  setRefNo(refNo: string): TransmittalFormBuilder {
    this._refNo = refNo;
    
    return this;
  }

  get subject(): string {
    return this._subject;
  }

  setSubject(refNo: string): TransmittalFormBuilder {
    this._refNo = refNo;
    
    return this;
  }

  get remarks(): string {
    return this._remarks;
  }

  setRemarks(remarks: string): TransmittalFormBuilder {
    this._remarks = remarks;
    
    return this;
  }

  get items(): TransmittalFormItem[] {
    return this._items;
  }

  addItem(item: TransmittalFormItem): TransmittalFormBuilder {
    this.items.push(item);

    return this;
  }

  removeItem(index): TransmittalFormBuilder {
    this.items.splice(index, 0);

    return this;
  }
}