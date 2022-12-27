import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminActivate implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAdmin = this.authService.user!.roles.includes('admin');

        if(isAdmin) {return true;}

        const returnUrl = route.url.map(u => u.path).join('/');
        return this.router.createUrlTree(['/'], {queryParams: {returnUrl}});
    }
}