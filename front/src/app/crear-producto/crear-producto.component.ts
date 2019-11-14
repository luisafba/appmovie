import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../servicios/crear-producto.service';

@Component({
  selector: 'crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder, 
    private _productoservice: ProductoService) { } //notacion para servicios

    isLoadingResults = false;
    productoForm: FormGroup = this.builder.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      anio: ['', Validators.required], 
      edad: ['', Validators.required], 
      duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      sinopsis: ['', Validators.required], 
      imagen: ['', Validators.required], 
      clasificacion: ['', Validators.required], 
      like: ['', Validators.required], 
      dislike: ['', Validators.required], 
      director: ['', Validators.required], 
      protagonista: ['', Validators.required], 
      categoria: ['', Validators.required], 
      archivo:[null,Validators.required]
    })

    ngOnInit() {
  }

  onSelectFile(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.productoForm.patchValue({
      archivo: file
    });
    this.productoForm.get('archivo').updateValueAndValidity()

  }

  enviar() {
    this.isLoadingResults = true;
    console.log(this.productoForm.value);
    this._productoservice.postProducto(this.productoForm.value).subscribe(response=>{
      const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(['/']);
       // this.notificacionService.success("Producto registrado satisfactoriamente!");
    }), (err: any) => {
      console.log(err);
      //sthis.notificacionService.error("Error al registrar el producto");
      this.isLoadingResults = false;
    }
  }

}
