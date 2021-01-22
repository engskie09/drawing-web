import { Client } from 'src/app/core/models/client';

export interface ClientDialogData {
  type: string;
  client?: Client;
  projectId?: string | number;
}