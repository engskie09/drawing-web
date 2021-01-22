import { User } from '../services/user.service';
import { formatDate, DatePipe } from '@angular/common';
import _ from 'lodash'

export class AuditTrail {
  public drawingTitle: string;
  public drawingNo: string;
  public date: string;
  public doneBy: User;
  public oldValues: any;
  public newValues: any;
  public event: AuditEvents;

  constructor(
    drawingTitle: string,
    drawingNo: string,
    date: string,
    doneBy: User,
    event: AuditEvents,
    oldValues: Object | Array<any>,
    newValues: Object | Array<any>,
  ) {
    this.drawingTitle = drawingTitle;
    this.drawingNo = drawingNo;
    this.date = date;
    this.doneBy = doneBy;
    this.event = event;
    this.oldValues = oldValues;
    this.newValues = newValues;
  }

  public getChangedKeys(): Array<string> {
    let changedKeys = [];

    if(this.event === AuditEvents.CREATED) {
      changedKeys = [];
    } else {
      changedKeys = Object.keys(this.oldValues)
    }

    return changedKeys
  }

  public displayChangedKeys(): string {
    const changedKeys = this.getChangedKeys().map(key => {
      return _.startCase(key);
    });

    return changedKeys.join(', ');
  }
}

export enum AuditEvents {
  UPDATED = 'updated',
  CREATED = 'created',
}