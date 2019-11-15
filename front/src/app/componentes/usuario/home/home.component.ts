import { BuscadorService } from "./../../../servicios/buscador.service";
import { from } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Pelicula } from "../../../modelos/pelicula";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private buscadorservice: BuscadorService) {}

  ngOnInit() {}

  Peliculas;
  buscarPelicula(titulo) {
    this.buscadorservice.buscarPelicula(titulo).subscribe(res => {
      this.Peliculas = res;
      console.log(this.Peliculas);
    });
  }
}
