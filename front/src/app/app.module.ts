import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./componentes/usuario/index/index.component";
import { HomeComponent } from "./componentes/usuario/home/home.component";
import { MenuComponent } from "./componentes/partes/menu/menu.component";
import { FooterComponent } from "./componentes/partes/footer/footer.component";
import { FormLoginComponent } from "./componentes/usuario/login/login.component";
import { RegistroComponent } from "./componentes/usuario/registro/registro.component";
import { PeliculaComponent } from "./componentes/usuario/pelicula/pelicula.component";
import { AdminListaPelisComponent } from "./componentes/admin/admin-lista-pelis/admin-lista-pelis.component";
import { AdminInfoPelisComponent } from "./componentes/admin/admin-info-pelis/admin-info-pelis.component";
import { CanActivateViaAuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { InfoPerfilComponent } from "./componentes/usuario/info-perfil/info-perfil.component";
import { AdminEditarUsuariosComponent } from "./componentes/admin/admin-editar-usuarios/admin-editar-usuarios.component";
import { AdminProductoComponent } from "./componentes/admin/admin-producto/admin-producto.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FavoritosComponent } from "./componentes/usuario/favoritos/favoritos.component";
/* import { AdminNuevoEditarComponent } from "./componentes/admin/admin-nuevo-editar/admin-nuevo-editar.component"; */

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
    component: FormLoginComponent
  },
  {
    path: "ActualizarPerfil",
    component: InfoPerfilComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "ActualizarPerfil/:id",
    component: InfoPerfilComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "editarUsuarios",
    component: AdminEditarUsuariosComponent,
    canActivate: [CanActivateViaAuthGuard]
  },

  {
    path: "favoritos",
    component: FavoritosComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "peliculas/:id",
    component: PeliculaComponent,
    canActivate: [CanActivateViaAuthGuard],
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
    component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard]
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
    ],
    canActivate: [CanActivateViaAuthGuard]
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
    ],
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "adminPelicula/:id",
    component: AdminProductoComponent,
    canActivate: [CanActivateViaAuthGuard],
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
    path: "adminPelicula",
    component: AdminProductoComponent,

    canActivate: [CanActivateViaAuthGuard],
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
    FormLoginComponent,
    RegistroComponent,
    PeliculaComponent,
    AdminListaPelisComponent,
    AdminInfoPelisComponent,
    InfoPerfilComponent,
    AdminEditarUsuariosComponent,
    /*    AdminNuevoEditarComponent */
    AdminProductoComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CanActivateViaAuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
