import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of  } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Producto } from "../modelos/producto.module";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly httpOptions = {
    //headers: new HttpHeaders({'Content-Type': 'application/json'})
    //headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    //headers: new HttpHeaders({ "Accept": "application/json" })
  };

readonly Url_API = 'http://localhost:3000/api/productos'

constructor(private http: HttpClient) { }
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.Url_API);
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    return of(result as T);
  };
}

postProducto(producto:Producto): Observable<Producto> {
  var formData: any = new FormData();
  formData.append("nombre", producto.nombre);
  formData.append("genero", producto.genero);
  formData.append("anio", producto.anio);
  formData.append("edad", producto.edad);
  formData.append("duracion", producto.duracion);
  formData.append("sinopsis", producto.sinopsis);
  formData.append("imagen", producto.imagen);
  formData.append("clasificacion", producto.clasificacion);
  formData.append("like", 0);
  formData.append("dislike", 0);
  formData.append("director", producto.director);
  formData.append("protagonista", producto.protagonista);
  formData.append("video", producto.video);
  
  return this.http.post<Producto>(this.Url_API, formData, this.httpOptions);
}

getProducto(id: number): Observable<Producto> {
  const url = this.Url_API+"/"+id;
  console.log(url);
  return this.http.get<Producto>(url).pipe(
    tap(_ => console.log('fetched Producto id='+id)),
    catchError(this.handleError<Producto>('getProducto id='+id))
  );
}

updateProducto(_id:String, producto:Producto): Observable<Producto> {
  var formData: any = new FormData();
  const url = this.Url_API+"/"+_id;
  formData.append("nombre", producto.nombre);
  formData.append("genero", producto.genero);
  formData.append("anio", producto.anio);
  formData.append("duracion", producto.duracion);
  formData.append("sinopsis", producto.sinopsis);
  formData.append("imagen", producto.imagen);
  formData.append("clasificacion", producto.clasificacion);
  formData.append("like", producto.like);
  formData.append("dislike", producto.dislike);
  formData.append("director", producto.director);
  formData.append("protagonista", producto.protagonista);
  formData.append("video", producto.video);
  return this.http.put<Producto>(url, formData, this.httpOptions);
}

deleteProducto(id: any): Observable<Producto> {
  const url = this.Url_API+"/"+id;
  return this.http.delete<Producto>(url, this.httpOptions).pipe(
    tap(_ => console.log('deleted Producto id='+id)),
    catchError(this.handleError<Producto>('deleteProducto'))
  );
}

}

