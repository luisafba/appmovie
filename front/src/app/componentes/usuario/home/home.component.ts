import { BuscadorService } from "./../../../servicios/buscador.service";
import { from } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Pelicula } from "../../../modelos/pelicula";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.module";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private buscadorservice: BuscadorService,
    private _loginService: LoginService,
    private router: Router
  ) {}

  activo = true;
  usuarioActual: Usuario;

  ngOnInit() {}

  Peliculas;
  buscarPelicula(titulo) {
    this.buscadorservice.buscarPelicula(titulo).subscribe(res => {
      this.Peliculas = res;
      console.log(this.Peliculas);
    });
  }

  cerrarSesion() {
    this._loginService.logout();
    this.router.navigate(["inicio"]);
  }

  get() {
    this.activo = !this.activo;
  }
}
