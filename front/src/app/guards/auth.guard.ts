import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CanActivate } from "@angular/router";
import { LoginService } from "../servicios/login.service";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private _loginService: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._loginService.obtenerUsuario()) {
      this.router.navigate(["index"]);
      return false;
    }
    return true;
  }
}