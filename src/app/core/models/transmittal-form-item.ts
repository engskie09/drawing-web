import { TenderDrawing } from './tender-drawing';

export interface TransmittalFormItem {
  _id: number | string;
  serial_no: string;
  drawing: TenderDrawing;
  refNo: string;
  qty: number | string;
}