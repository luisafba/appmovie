/* import { Usuario } from "./../modelos/usuario.module";
import { LoginService } from "./../login.service";
import { Component, OnInit } from "@angular/core";
import { Route } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./form-login.component.html",
  styleUrls: ["./form-login.component.css"]
})
export class FormLoginComponent implements OnInit {
  constructor(private _loginService: LoginService) {}

  ngOnInit() {}
  login(usuario: Usuario) {
    this._loginService
      .login(usuario)
      .then(() => {
        /* this._router.navigate(["descarga"]); */
/*         alert("Se logueó");
      })
      .catch(() => {
        alert("Usuario Inválido");
      });
  }
} */
