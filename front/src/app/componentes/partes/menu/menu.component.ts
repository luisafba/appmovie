import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.module";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private _loginService: LoginService, private router: Router) {}

  activo = false;
  usuarioActual: Usuario;

  ngOnInit() {
    this.usuarioActual = this._loginService.obtenerUsuario();
  }

  cerrarSesion() {
    this._loginService.logout();
    this.router.navigate(["index"]);
  }

  get() {
    this.activo = !this.activo;
  }
}
