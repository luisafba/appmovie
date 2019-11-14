import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./componentes/usuario/index/index.component";
import { HomeComponent } from "./componentes/usuario/home/home.component";
import { MenuComponent } from "./componentes/partes/menu/menu.component";
import { FooterComponent } from "./componentes/partes/footer/footer.component";
import { LoginComponent } from "./componentes/usuario/login/login.component";
import { RegistroComponent } from "./componentes/usuario/registro/registro.component";
import { PeliculaComponent } from "./componentes/usuario/pelicula/pelicula.component";
import { AdminListaPelisComponent } from "./componentes/admin/admin-lista-pelis/admin-lista-pelis.component";
import { AdminInfoPelisComponent } from "./componentes/admin/admin-info-pelis/admin-info-pelis.component";
import { AdminNuevoEditarComponent } from "./componentes/admin/admin-nuevo-editar/admin-nuevo-editar.component";

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
    component: RegistroComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "peliculas",
    component: PeliculaComponent,
    children: [
      {
        path: "",
        pathMatch: "prefix",
        redirectTo: "menu"
      },
      {
        path: "menu",
        component: MenuComponent
      }
    ]
  },
  {
    path: "home",
    component: HomeComponent
    /* children: [
      {
        path: "",
        pathMatch: "prefix",
        redirectTo: "menu"
      },
      {
        path: "",
        component: MenuComponent
      }
    ] */
  },
  {
    path: "infoPeliculas",
    component: AdminInfoPelisComponent,
    children: [
      {
        path: "",
        pathMatch: "prefix",
        redirectTo: "menu"
      },
      {
        path: "",
        component: MenuComponent
      }
    ]
  },
  {
    path: "listaPeliculas",
    component: AdminListaPelisComponent,
    children: [
      {
        path: "",
        pathMatch: "prefix",
        redirectTo: "menu"
      },
      {
        path: "",
        component: MenuComponent
      }
    ]
  },
  {
    path: "nuevoEditarPelicula",
    component: AdminNuevoEditarComponent,
    children: [
      {
        path: "",
        pathMatch: "prefix",
        redirectTo: "menu"
      },
      {
        path: "",
        component: MenuComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    PeliculaComponent,
    AdminListaPelisComponent,
    AdminInfoPelisComponent,
    AdminNuevoEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
