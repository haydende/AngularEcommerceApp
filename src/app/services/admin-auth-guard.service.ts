import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .pipe(map(appUser => {
        if (!appUser.isAdmin) {
          this.router.navigate(['/']);
        }
        return appUser.isAdmin;
      }));
  }
}
