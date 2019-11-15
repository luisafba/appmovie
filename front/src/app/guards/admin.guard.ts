import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CanActivate } from "@angular/router";
import { LoginService } from "../servicios/login.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _loginService: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this._loginService.obtenerUsuario() &&
      this._loginService.obtenerUsuario().role !== "Admin"
    ) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
