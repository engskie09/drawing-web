import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class MenuService {
  MENU_KEY = 'sbheDrawingMenu';

  private menuStatusSubject = new BehaviorSubject<boolean>(false);
  public menuStatus = this.menuStatusSubject.asObservable().pipe(distinctUntilChanged());

  setMenuStatus(
    status: boolean
  ) {
    this.menuStatusSubject.next(status);
  }
}