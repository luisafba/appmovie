import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  constructor( private _builder: FormBuilder ) {
    this.registroForm = this._builder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }
  enviar(datos) {
    console.log(datos);
  }
  ngOnInit() {
  }

}
