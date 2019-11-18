import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from "../../../modelos/producto.module";
import { BuscadorService } from "./../../../servicios/buscador.service";
import { from } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.module";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private buscadorservice: BuscadorService,
    private _productoservice: ProductoService,
    private _loginService: LoginService,
    private router: Router
  ) {}

  activo = true;
  usuarioActual: Usuario;
  peliculasTodas = true;
  peliculasGenero = false;
  peliculasInput = false;

  ngOnInit() {
    this.obtenerPeliculas()
  }

  peliculaInput;
  buscarPelicula(titulo) {
    this.buscadorservice.buscarPelicula(titulo).subscribe(res => {
      this.peliculaInput = res;
      this.peliculasTodas = false;
      this.peliculasGenero = false;
      this.peliculasInput = true;
      console.log(this.peliculaInput);
    });
  }

  // OBTENER PELICULAS
  pelis;
  insertarCarrusel;
  j = 0;
  limitePelis = 4;
  obtenerPeliculas() {
    this._productoservice.getProductos().subscribe(res => {
      this.pelis = res;
      console.log(res);
      this.peliculasInput = false;
      this.peliculasTodas = true;
      this.peliculasGenero = false;
      // for (let i = 0; i < (this.pelis.productos.length / 12); i++) {
      //   console.log(i);
      //   this.insertarCarrusel = `${this.insertarCarrusel}
      //     <div id="carouselExampleIndicators${i}" class="carousel slide" data-ride="carousel">
      //         <ol class="carousel-indicators">
      //             <li data-target="#carouselExampleIndicators${i}" data-slide-to="0" class="active"></li>
      //             <li data-target="#carouselExampleIndicators${i}" data-slide-to="1"></li>
      //             <li data-target="#carouselExampleIndicators${i}" data-slide-to="2"></li>
      //         </ol>
      //         <div class="carousel-inner">`
      //   for (let k = 0; k <= 3; k++){
      //     if(k == 0) {
      //       this.insertarCarrusel = `${this.insertarCarrusel}
      //         <div class="carousel-item active">
      //           <div class="row">`
      //     } else {
      //       this.insertarCarrusel = `${this.insertarCarrusel}
      //         <div class="carousel-item">
      //           <div class="row">`
      //     }
      //     for (this.j; this.j < this.limitePelis; this.j++) {
      //       this.insertarCarrusel = `${this.insertarCarrusel}
      //           <div class="col-md-3">
      //               <div class="card text-center" style="width: 18rem;">
      //                   <img src="https://www.anime-planet.com/images/anime/covers/hell-girl-two-mirrors-1352.jpg"
      //                       class="card-img-top img-card-peli" alt="...">
      //                   <div class="card-body">
      //                       <h5 class="card-title">${this.pelis.productos[this.j].nombre}</h5>
      //                       <h6 class="card-subtitle mb-2 text-muted">${this.pelis.productos[this.j].genero}</h6>
      //                       <p>like: ${this.pelis.productos[this.j].like} | Dislike: ${this.pelis.productos[this.j].dislike}</p>
      //                       <a [routerLink]="['/peliculas', ${this.pelis.productos[this.j]._id}]" class="btn btn-primary btn-sm btn-block">Más Info</a>
      //                   </div>
      //               </div>
      //           </div>`
      //     } 
      //   this.limitePelis = this.limitePelis + 4;
      //   this.insertarCarrusel = `${this.insertarCarrusel}
      //     </div>
      //   </div>`
      //   }
      //   this.insertarCarrusel = `${this.insertarCarrusel}
      //       </div>
      //       <a class="carousel-control-prev" href="#carouselExampleIndicators${i}" role="button" data-slide="prev">
      //           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      //           <span class="sr-only">Previous</span>
      //       </a>
      //       <a class="carousel-control-next" href="#carouselExampleIndicators${i}" role="button" data-slide="next">
      //           <span class="carousel-control-next-icon" aria-hidden="true"></span>
      //           <span class="sr-only">Next</span>
      //       </a>
      //   </div>`;
      // }
    })
  }
  // OBRENER PELICULAS POR GENERO
  peliculasG;
  peliGenero(genero) {
    this.buscadorservice.buscarPeliculaGenero(genero).subscribe(res => {
      this.peliculasG = res
      console.log(res)
      this.peliculasTodas = false;
      this.peliculasGenero = true;
      this.peliculasInput = false;
    })
  }
  
  cerrarSesion() {
    this._loginService.logout();
    this.router.navigate(["inicio"]);
  }

  get() {
    this.activo = !this.activo;
  }
}
