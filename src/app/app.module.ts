import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { LoginComponent } from './vistas/login/login.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { ActividadesComponent } from './vistas/actividades/actividades.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SodiumService } from './servicios/sodium/sodium.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ModalUsuariosComponent } from './vistas/usuarios/modal-usuarios/modal-usuarios.component';
import {MatDialogModule  } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ModalEstatusUsuariosComponent } from './vistas/usuarios/modal-estatus-usuarios/modal-estatus-usuarios.component';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DetalleActividadesComponent } from './vistas/actividades/detalle-actividades/detalle-actividades.component';
import { ModalEliminarActComponent } from './vistas/actividades/detalle-actividades/modal-eliminar-act/modal-eliminar-act.component';
import { ModalRegistrarActComponent } from './vistas/actividades/detalle-actividades/modal-registrar-act/modal-registrar-act.component';
import { ModalValidarActComponent } from './vistas/actividades/detalle-actividades/modal-validar-act/modal-validar-act.component';
import { ModalVerDescripcionComponent } from './vistas/actividades/detalle-actividades/modal-ver-descripcion/modal-ver-descripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsuariosComponent,
    ActividadesComponent,
    NotFoundComponent,
    ModalUsuariosComponent,
    ModalEstatusUsuariosComponent,
    DetalleActividadesComponent,
    ModalEliminarActComponent,
    ModalRegistrarActComponent,
    ModalValidarActComponent,
    ModalVerDescripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTableModule,
  ],
  providers: [
    provideAnimationsAsync(),
    SodiumService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
