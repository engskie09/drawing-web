import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DrafterGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.currentUser.pipe(map(user => {
      if(user.isDrafter) {
        return true;
      }

      this.router.navigateByUrl('/unauthorized');
      return false;
    }));
  }
}