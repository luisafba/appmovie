import { Injectable } from "@angular/core";
import { Usuario } from "./modelos/usuario.module";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}
  usuarioLogueado: Usuario;

  private urlBack = "http://localhost:3000/api";

  // login(user: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(`${this.urlBack}/login`, user);
  // }

  login(user: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Usuario>(`${this.urlBack}/login`, user)
        .subscribe((resp: any) => {
          if (resp.login) {
            this.usuarioLogueado = resp.user;
            window.sessionStorage.setItem("usuario", JSON.stringify(resp.user));
            resolve();
          } else {
            reject();
          }
        });
    });
  }

  logout() {
    this.usuarioLogueado = null;
    window.sessionStorage.clear();
  }

  obtenerUsuario() {
    if (!this.usuarioLogueado && window.sessionStorage.getItem("usuario")) {
      this.usuarioLogueado = JSON.parse(
        window.sessionStorage.getItem("usuario")
      );
    }
    return this.usuarioLogueado;
  }

  actualizarUsuario(usuario: Usuario) {
    this.usuarioLogueado = usuario;
    window.sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }
}
