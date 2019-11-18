import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from "../../../modelos/producto.module";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-producto',
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.css']
})
export class AdminProductoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder,
    private _productoservice: ProductoService,private modalService: NgbModal) { } //notacion para servicios

  producto: Producto;
  _id = null;
  videoAnterior = '';
  imagenAnterior = '';

  isLoadingResults = false;
  productoForm: FormGroup;

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.getProducto(this.route.snapshot.params.id);
      this.productoForm = this.builder.group({
        nombre: ['', Validators.required],
        genero: ['', Validators.required],
        anio: ['', Validators.required],
        duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        sinopsis: ['', Validators.required],
        clasificacion: ['', Validators.required],
        like: ['', Validators.required],
        dislike: ['', Validators.required],
        director: ['', Validators.required],
        protagonista: ['', Validators.required],
        imagen: [null],
        video: [null]
      })
    } else {
      this.productoForm = this.builder.group({
        nombre: ['', Validators.required],
        genero: ['', Validators.required],
        anio: ['', Validators.required],
        duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        sinopsis: ['', Validators.required],
        clasificacion: ['', Validators.required],
        director: ['', Validators.required],
        protagonista: ['', Validators.required],
        imagen: [null, Validators.required],
        video: [null, Validators.required]
      })
    }
  }

  onSelectFile(event, identificador) {
    const file = (event.target as HTMLInputElement).files[0];
    if (identificador === "video") {
      this.productoForm.patchValue({
        video: file
      });
    } else {
      this.productoForm.patchValue({
        imagen: file
      });
    }
    this.productoForm.get(identificador).updateValueAndValidity()

  }

  enviar() {
    this.isLoadingResults = true;
    console.log(this.productoForm.value);
    if (this._id != null) {
      this._productoservice.updateProducto(this._id, this.productoForm.value)
        .subscribe((res: any) => {
          const id = res.productoActualizado._id;
          this.isLoadingResults = false;
          this.router.navigateByUrl('/adminPelicula', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/adminPelicula', id]);
        }); 
          //this.notificacionService.success("Canción actualizada satisfactoriamente!");
        }, (err: any) => {
          console.log(err);
          //this.notificacionService.error("Error al actualizar la canción");
          this.isLoadingResults = false;
        }
        );

    } else {
      this._productoservice.postProducto(this.productoForm.value).subscribe(response => {
        const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(['/listaPeliculas']);
        // this.notificacionService.success("Producto registrado satisfactoriamente!");
      }), (err: any) => {
        console.log(err);
        //sthis.notificacionService.error("Error al registrar el producto");
        this.isLoadingResults = false;
      }
    }
  }
  getProducto(id: any) {
    console.log("idProducto" + id);
    this._productoservice.getProducto(id).subscribe((data: any) => {
      console.log(data);
      this._id = data.producto._id;
      this.producto = data.producto;
      this.videoAnterior = data.producto.video;
      this.imagenAnterior = data.producto.imagen;
      this.productoForm.setValue({
        nombre: data.producto.nombre,
        genero: data.producto.genero,
        anio: data.producto.anio,
        duracion: data.producto.duracion,
        sinopsis: data.producto.sinopsis,
        clasificacion: data.producto.clasificacion,
        like: data.producto.like,
        dislike: data.producto.dislike,
        director: data.producto.director,
        protagonista: data.producto.protagonista,
        imagen: null,
        video: null
      });
    });
  }
  volver() {
    this.router.navigate(['/listaPeliculas']);
  }
  eliminar(producto){
    const message = "Seguro desea borrar la película ("+producto._id+")?";
    const datos=["Película: "+producto.nombre];

  }

  confirmarEliminar(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modalConfirmarEliminar'}).result.then((result) => {

      this.isLoadingResults = true;
        this._productoservice.deleteProducto(this.producto._id)
          .subscribe(res => {
              this.isLoadingResults = false;
              //this.notificacionService.success("Se eliminó la canción correctamente!");
              this.router.navigate(['/listaPeliculas']);
            }, (err) => {
              console.log(err);
              this.isLoadingResults = false;
            }
          );
    }, (reason) => {
     
    });
  }
  

}
