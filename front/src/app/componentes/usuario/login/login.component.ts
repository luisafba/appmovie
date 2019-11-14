import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm: FormGroup
  constructor( private _builder: FormBuilder) {
    this.logForm = this._builder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  enviar(values) {
    console.log(values);
  }
  ngOnInit() {
  }

}
