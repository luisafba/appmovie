import { FormBuilder } from "@angular/forms";
import { Usuario } from "../../../modelos/usuario.module";
import { LoginService } from "../../../login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./form-login.component.html",
  styleUrls: ["./form-login.component.css"]
})
export class FormLoginComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {}
  login(usuario: Usuario) {
    this._loginService
      .login(usuario)
      .then(() => {
        this._router.navigate(["menu"]);
        /* alert("Se logueó"); */
      })
      .catch(() => {
        alert("Usuario Inválido");
      });
  }
}
