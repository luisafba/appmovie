import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.module";

@Component({
  selector: "info-perfil",
  templateUrl: "./info-perfil.component.html",
  styleUrls: ["./info-perfil.component.css"]
})
export class InfoPerfilComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _userService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  usuario: Usuario = {} as Usuario;
  usuarioLogueado: Usuario;

  imagenPerfil: File;

  ngOnInit() {
    let usuarioOriginal = this._loginService.obtenerUsuario();
    this.usuarioLogueado = usuarioOriginal;
    const id = this.activatedRoute.snapshot.params.id;
    if (id && usuarioOriginal._id !== id) {
      this._userService.consultarUsuario(id).subscribe(usuario => {
        usuarioOriginal = usuario;
        this.poblar(usuarioOriginal);
      });
    } else {
      this.poblar(usuarioOriginal);
    }
  }

  poblar(usuarioOriginal: Usuario) {
    this.usuario._id = usuarioOriginal._id;
    this.usuario.nombre = usuarioOriginal.nombre;
    this.usuario.correo = usuarioOriginal.correo;
    this.usuario.edad = usuarioOriginal.edad;
    this.usuario.imagen = usuarioOriginal.imagen;
    this.usuario.role = usuarioOriginal.role;
  }

  actualizarUsuario() {
    this._userService
      .editarUsuario(this.usuario, this.imagenPerfil)
      .subscribe(resp => {
        if (this.usuario._id === this.usuarioLogueado._id) {
          this._loginService.actualizarUsuario(this.usuario);
        }
        this.router.navigate(["home"]);
      });
  }

  handleImageInput(event) {
    this.imagenPerfil = (event.target as HTMLInputElement).files[0];
  }
}
