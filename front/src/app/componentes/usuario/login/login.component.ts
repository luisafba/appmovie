import { Usuario } from "../../../modelos/usuario.module";
import { LoginService } from "../../../servicios/login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class FormLoginComponent implements OnInit {
  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {}
  login(usuario: Usuario) {
    this._loginService
      .login(usuario)
      .then(() => {
        this._router.navigate(["inicio"]);
      })
      .catch(() => {
        alert("Usuario Inválido");
      });
  }
}
