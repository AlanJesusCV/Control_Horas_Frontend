import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { AuthGuard } from './guards/guards';
import { ActividadesComponent } from './vistas/actividades/actividades.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { DetalleActividadesComponent } from './vistas/actividades/detalle-actividades/detalle-actividades.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'actividades',
    component: ActividadesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'actividadesDetalle/:detalle', component: DetalleActividadesComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  // Agrega más rutas protegidas aquí
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: '**', component: NotFoundComponent }, // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
