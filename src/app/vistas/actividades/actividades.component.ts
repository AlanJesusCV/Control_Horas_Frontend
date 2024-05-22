import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { AlertService } from '../../servicios/alertas/alerta.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalEstatusUsuariosComponent } from '../usuarios/modal-estatus-usuarios/modal-estatus-usuarios.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { format } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'horas_pendientes',
    'horas_completas',
    'actions',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  totalItems: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  showSpinner: boolean = false;
  currentPage = 1; // Página actual
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employees: any[] = [];
  busquedaControl = new FormControl();
  employeesFilter: Observable<any[]> = new Observable<any[]>();
  getPerfil = localStorage.getItem('tipo');

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private userService: UsuariosService,
    public dialog: MatDialog,
    private alertService: AlertService,
    private activityService: ActividadesService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.userService.getUsersAutoComplete().subscribe((employees) => {
      console.log(employees.response);

      this.employees = employees.response || []; // Asegúrate de manejar el caso de que no se devuelvan datos
      this.inicializarAutocompletar();
    });
  }

  loadData(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageEvent(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.loadData();
  }

  searchDaysByClient() {
    this.showSpinner = true;
    let fechaInicio = this.range.get('start')?.value;
    let fechaFin = this.range.get('end')?.value;

    // Formatear las fechas al formato 'Y-m-d'
    const fechaInicioFormateada = fechaInicio
      ? format(fechaInicio, 'yyyy-MM-dd')
      : '';
    const fechaFinFormateada = fechaFin ? format(fechaFin, 'yyyy-MM-dd') : '';

    if (fechaInicioFormateada == '' || fechaFinFormateada == '') {
      this.alertService.showAlert('El rango de fechas es incorrecto.', true); // Mostrar alerta de error
      this.showSpinner = false;
      return;
    }

    if (this.getPerfil == 'Capturador') {
      let getIDUser = localStorage.getItem('numero_emp');
      this.activityService
        .getActivitiesByFilter(
          getIDUser,
          fechaInicioFormateada,
          fechaFinFormateada
        )
        .subscribe(
          (response: any) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true); // Mostrar alerta de error
              console.log(response);
              this.showSpinner = false;
            } else {
              this.dataSource.data = response.response;
              this.showSpinner = false;
            }
          },
          (error: any) => {
            console.error('Error al llamar al servicio:', error);
            this.showSpinner = false;
            this.alertService.showAlert('Error al llamar al servicio', true); // Mostrar alerta de error
          }
        );
    } else {
      let empleado = this.formatEmployeNumber(this.busquedaControl.value);

      if (empleado == null) {
        this.alertService.showAlert('Debe seleccionar un empleado.', true); // Mostrar alerta de error
        this.showSpinner = false;
        return;
      }
      this.activityService
        .getActivitiesByFilter(
          empleado,
          fechaInicioFormateada,
          fechaFinFormateada
        )
        .subscribe(
          (response: any) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true); // Mostrar alerta de error
              console.log(response);
              this.showSpinner = false;
            } else {
              this.dataSource.data = response.response;
              this.showSpinner = false;
            }
          },
          (error: any) => {
            console.error('Error al llamar al servicio:', error);
            this.showSpinner = false;
            this.alertService.showAlert('Error al llamar al servicio', true); // Mostrar alerta de error
          }
        );
    }
  }

  private inicializarAutocompletar(): void {
    this.employeesFilter = this.busquedaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtraremployees(value))
    );
  }

  private filtraremployees(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter((empleado) =>
      empleado.empleado.toLowerCase().includes(filterValue)
    );
  }

  private formatEmployeNumber(cadena: string) {
    const regex = /\(([^)]+)\)/;
    const resultado = regex.exec(cadena);

    // Verificar si se encontró un resultado
    if (resultado && resultado.length > 1) {
      return resultado[1];
    } else {
      return null;
    }
  }

  viewDetail(activity: any) {
    let getIDUser = localStorage.getItem('numero_emp');
    let usuario =
      this.getPerfil == 'Capturador'
        ? getIDUser
        : this.formatEmployeNumber(this.busquedaControl.value);
    let dataActivitiy = {
      idUser: usuario,
      fecha: activity.fecha,
    };
    let formatActivity = btoa(JSON.stringify(dataActivitiy));
    this.router.navigate(['/actividadesDetalle', formatActivity]);
  }
}
