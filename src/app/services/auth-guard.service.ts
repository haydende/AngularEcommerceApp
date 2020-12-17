import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$
      .pipe(map(user => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        return false;
      }));
  }
}
