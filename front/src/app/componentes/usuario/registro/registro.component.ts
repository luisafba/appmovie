import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../../../servicios/usuario.service";
import { Usuario } from "src/app/modelos/usuario.module";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private _usuarioservice: UsuarioService,
    private router: Router
  ) {}
  registroForm: FormGroup = this.builder.group({
    nombre: ["", Validators.required],
    edad: ["", Validators.required],
    correo: ["", Validators.required],
    password: ["", Validators.required]
  });

  enviar(registro: Usuario) {
    this._usuarioservice.postUsuario(registro).subscribe(
      response => {
        this.router.navigate(["login"]);
      },
      error => {
        alert("Ha ocurrido un error al crear el usuario");
      }
    );
  }
  ngOnInit() {}
}
