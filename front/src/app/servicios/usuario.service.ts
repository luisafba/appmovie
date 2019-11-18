import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../modelos/usuario.module";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private usuario: Usuario = null;

  private userImagesUrl = "http://localhost:3000/public/usr-images/";
  private urlBack = "http://localhost:3000/api";

  getRutaImagenesPerfil() {
    return this.userImagesUrl;
  }

  getUsuario() {
    return this.usuario;
  }

  postUsuario(user): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBack}/usuarios`, user);
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  editarUsuario(usuario: Usuario, imagenPerfil: File) {
    let formData: FormData = new FormData();
    formData.append("usuario", JSON.stringify(usuario));
    formData.append("imagen", imagenPerfil);
    return this.http.put<Usuario>(
      `${this.urlBack}/usuarios/${usuario._id}`,
      formData
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
