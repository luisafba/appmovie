import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  constructor( 
    private _route: ActivatedRoute,
    private productoservice: ProductoService
  ) { }
  id
  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.pelicula()
  }
  // OBTENER INFO PELICULAS
  infoPelicula: any = []
  pelicula() {
    this.productoservice.getProducto(this.id).subscribe(res => {
      this.infoPelicula = res
      console.log(this.infoPelicula);
    })
  }
}
