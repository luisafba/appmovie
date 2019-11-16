/* import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificacionService } from "../../../servicios/notificacion.service";
import { SeriesPelisService } from "../../../servicios/seriespelis.service";

@Component({
  selector: "app-adminNuevoEditar",
  templateUrl: "./admin-nuevo-editar.component.html",
  styleUrls: ["./admin-nuevo-editar.component.css"]
})
export class AdminNuevoEditarComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private notificacionService: NotificacionService,
    private _seriePelis: SeriesPelisService
  ) {}
  imageToUpload: File = null;
  videoToUpload: File = null;
  isLoadingResults = false;
  editarPeliculaForm: FormGroup = this.builder.group({
    nombre: ["", Validators.required],
    genero: ["", Validators.required],
    anio: ["", Validators.required],
    duracion: [
      "",
      Validators.compose([Validators.required, Validators.minLength(1)])
    ],
    sinopsis: ["", Validators.required],
    imagen: ["", Validators.required],
    clasificacion: ["", Validators.required],
    director: ["", Validators.required],
    protagonista: ["", Validators.required],
    archivo: [null, Validators.required],
    comentarios: ["", Validators.required]
  });

  ngOnInit() {}

  enviar() {
    this.isLoadingResults = true;
    console.log(this.editarPeliculaForm.value);
    this._seriePelis
      .postSeriePelis(this.editarPeliculaForm.value, this.imageToUpload, this.videoToUpload)
      .subscribe(response => {
        const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(["/nuevoEditarPelicula"]);
        this.notificacionService.success(
          "Película registrada satisfactoriamente!"
        );
      },
      (err: any) => {
        console.log(err);
        this.notificacionService.error("Error al registrar la película");
        this.isLoadingResults = false;
      });
  }

  handleImageInput(files: FileList) {
    this.imageToUpload = files.item(0);
  }

  handleVideoInput(files: FileList) {
    this.videoToUpload = files.item(0);
  }
}
 */
