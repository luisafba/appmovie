import { Injectable } from "@angular/core";
import { Pelicula } from "../modelos/pelicula";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BuscadorService {
  constructor(private http: HttpClient) {}

  buscarPelicula(titulo) {
    return this.http.get("http://localhost:3000/api/buscarPelicula/" + titulo);
  }
}
