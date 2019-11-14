import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./modelos/usuario.module";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private usuario: Usuario = null;

  private urlBack = "http://localhost:3000/api";

  getUsuario() {
    return this.usuario;
  }

  // getUsuario(): Observable<Usuario> {
  //   return this.http.get<Usuario>("http://localhost:3000/api");
  // }

  postUsuario(user): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBack}/usuarios`, user);
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  editarUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(
      `${this.urlBack}/usuarios/${usuario._id}`,
      usuario
    );
  }

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(`${this.urlBack}/usuarios`).pipe(
      map((res: any) => {
        return res.usuarios;
      })
    );
  }

  eliminarUsuario(id: string) {
    return this.http.delete<Usuario>(`${this.urlBack}/usuarios/${id}`);
  }

  consultarUsuario(id: string) {
    return this.http.get<Usuario>(`${this.urlBack}/usuarios/${id}`);
  }
}
