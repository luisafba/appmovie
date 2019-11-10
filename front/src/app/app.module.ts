import { IndexComponent } from "./componentes/usuario/index/index.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormRegistroComponent } from "./componentes/usuario/form-registro/form-registro.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormLoginComponent } from "./componentes/usuario/form-login/form-login.component";
import { HomeComponent } from "./componentes/usuario/home/home.component";
import { CuentaAdministradorComponent } from "./componentes/administrador/cuenta-administrador/cuenta-administrador.component";
import { MenuComponent } from "./componentes/partes/menu/menu.component";
import { FooterComponent } from "./componentes/partes/footer/footer.component";
import { InfoPeliculaComponent } from "./componentes/pelicula/info-pelicula/info-pelicula.component";
import { EditarInfoPeliculaComponent } from "./componentes/administrador/editar-info-pelicula/editar-info-pelicula.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/inicio"
  },
  {
    path: "inicio",
    component: IndexComponent
  },
  {
    path: "index",
    component: IndexComponent
  },
  {
    path: "registro",
    component: FormRegistroComponent
    /*  canActivate: [CanActivateViaAuthGuard] */
  },
  {
    path: "login",
    component: FormLoginComponent
    /* canActivate: [CanActivateViaAuthGuard] */
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "menu",
    component: MenuComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    FormRegistroComponent,
    FormLoginComponent,
    HomeComponent,
    CuentaAdministradorComponent,
    MenuComponent,
    FooterComponent,
    InfoPeliculaComponent,
    EditarInfoPeliculaComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
