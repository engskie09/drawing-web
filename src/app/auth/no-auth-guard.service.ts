import { Injectable } from "@angular/core";
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { UserService } from '../core/services/user.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class NoAuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private userService: UserService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated.pipe(map(authenticated => {
      if(!authenticated) return true;

      this.router.navigateByUrl('/');
      return false;
     }));
  }
}