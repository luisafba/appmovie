import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto} from '../../../modelos/producto.module'

@Component({
  selector: 'app-adminListaPelis',
  templateUrl: './admin-lista-pelis.component.html',
  styleUrls: ['./admin-lista-pelis.component.css']
})
export class AdminListaPelisComponent implements OnInit {

  productosData: Producto[] = [];
  isLoadingResults = true;

  page = 1;
  pageSize = 5;
  collectionSize = 0;



  constructor(private router: Router, private route: ActivatedRoute, 
    private _productoservice: ProductoService) { } //

  ngOnInit() {
    this._productoservice.getProductos()
    .subscribe((res: any) => {
      this.productosData = res.productos;
      console.log(this.productosData);
      this.collectionSize=this.productosData.length;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  get productos(): Producto[] {
    return this.productosData
      .map((producto, i) => ({id: i + 1, ...producto}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
