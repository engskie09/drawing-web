import { Injectable } from "@angular/core";
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated.pipe(map(authenticated => {
      if(authenticated) {
        return true;
      }

      this.router.navigateByUrl('/login');
      return false;
    }));
  }
}