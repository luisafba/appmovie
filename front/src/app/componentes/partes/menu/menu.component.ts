import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.module";
import { BuscadorService } from "src/app/servicios/buscador.service";
import { UsuarioService } from "src/app/servicios/usuario.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private router: Router,
    private _userService: UsuarioService
  ) {}

  activo = true;
  usuarioActual: Usuario;
  rutaImagen: string;

  ngOnInit() {
    this.usuarioActual = this._loginService.obtenerUsuario();
    if (this.usuarioActual.imagen) {
      this.rutaImagen =
        this._userService.getRutaImagenesPerfil() + this.usuarioActual.imagen;
    }
  }

  cerrarSesion() {
    this._loginService.logout();
    this.router.navigate(["index"]);
  }

  get() {
    this.activo = !this.activo;
  }
}
