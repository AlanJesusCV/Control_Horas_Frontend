import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../servicios/alertas/alerta.service';
import { ActivatedRoute } from '@angular/router';
import { ModalRegistrarActComponent } from './modal-registrar-act/modal-registrar-act.component';
import { ActividadesService } from '../../../servicios/actividades/actividades.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalEliminarActComponent } from './modal-eliminar-act/modal-eliminar-act.component';
import { ModalVerDescripcionComponent } from './modal-ver-descripcion/modal-ver-descripcion.component';
import { ModalValidarActComponent } from './modal-validar-act/modal-validar-act.component';

@Component({
  selector: 'app-detalle-actividades',
  templateUrl: './detalle-actividades.component.html',
  styleUrl: './detalle-actividades.component.css',
})
export class DetalleActividadesComponent implements AfterViewInit {
  formatActivity: any;
  idUser: number = 0;
  fechaActivity: string = '';
  displayedColumns: string[] = [
    'id',
    'nameActivity',
    'hoursActivity',
    'typeActivity',
    'validate',
    'addedBy',
    'validateBy',
    'createdAt',
    'actions',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  totalItems: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  showSpinner: boolean = true;
  currentPage = 1; // Página actual
  idUserSession = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public alertService: AlertService,
    public activitiesService: ActividadesService
  ) {
    this.idUserSession = localStorage.getItem('id') || '';
    this.route.paramMap.subscribe((params) => {
      this.formatActivity = JSON.parse(atob(params.get('detalle')!));
      this.idUser = this.formatActivity.idUser;
      this.fechaActivity = this.formatActivity.fecha;
    });
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {}

  loadData(): void {
    this.activitiesService
      .getAcitivitesByUser(this.idUser, this.fechaActivity)
      .subscribe((users: any) => {
        this.dataSource.data = users.response;
        this.totalItems = users.response.length;
        this.showSpinner = false;
        console.log(users.response);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageEvent(event: any) {
    this.currentPage = event.pageIndex + 1;
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(ModalRegistrarActComponent, {
      width: '30%',
      data: {
        isEditMode: false,
        idUser: this.idUser,
        getDayActivity: this.fechaActivity,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      console.log(result);

      if (result == undefined) {
        this.showSpinner = false;
      } else {
        this.activitiesService.createActivity(result).subscribe(
          (response) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true);
            } else {
              this.alertService.showAlert(response.msg, false);
              this.loadData();
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Error al llamar al servicio:', error);
            this.alertService.showAlert('Error al llamar al servicio', true);
          }
        );
      }
      this.showSpinner = false;
    });
  }

  openEditModal(dataToEdit: any): void {
    const dialogRef = this.dialog.open(ModalRegistrarActComponent, {
      width: '30%',
      data: {
        isEditMode: true,
        idUser: this.idUser,
        editedData: dataToEdit,
        getDayActivity: this.fechaActivity,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == undefined) {
        this.loadData();
        this.showSpinner = false;
      } else {
        console.log(result);
        this.activitiesService.editActivity(result, result.id).subscribe(
          (response) => {
            if (response.error) {
              this.showSpinner = false;
              this.alertService.showAlert(response.msg, true); // Mostrar alerta de error
              console.log(response);
            } else {
              this.alertService.showAlert(response.msg, false); // Mostrar alerta de éxito
              this.loadData();
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Error al llamar al servicio:', error);
            this.alertService.showAlert('Error al llamar al servicio', true); // Mostrar alerta de error
          }
        );
      }
    });
    this.showSpinner = false;
  }

  validateProfile(activity: any) {
    let getProfile = localStorage.getItem('profile');

    if (getProfile != 'Capturador' && activity.validada == null) {
      if (activity.tipo_actividad == 'Indirecta' && getProfile == 'Validador') {
        return false;
      }
      return true;
    }
    return false;
  }

  validarFechaAnterior(dateStr: string): boolean {
    const dateInitial = new Date(dateStr);
    if (isNaN(dateInitial.getTime())) {
      return false;
    }
    const dateNow = new Date();
    const dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7);

    return dateInitial >= dateLastWeek && dateInitial <= dateNow;
  }

  deleteActivity(id: any) {
    const dialogRef = this.dialog.open(ModalEliminarActComponent, {
      width: '30%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == false) {
        this.loadData();
        this.showSpinner = false;
      } else if (result == true) {
        this.activitiesService.deleteActivity(id).subscribe(
          (response: any) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true);
              this.showSpinner = false;
            } else {
              this.alertService.showAlert(response.msg, false);
              this.loadData();
              this.showSpinner = false;
            }
          },
          (error: any) => {
            console.error('Error al llamar al servicio:', error);
            this.showSpinner = false;
            this.alertService.showAlert('Error al llamar al servicio', true);
          }
        );
      } else {
        this.loadData();
        this.showSpinner = false;
      }
    });
    this.showSpinner = false;
  }

  detailDescription(description: any) {
    const dialogRef = this.dialog.open(ModalVerDescripcionComponent, {
      width: '30%',
      data: { description: description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == false) {
        this.loadData();
        this.showSpinner = false;
      } else {
        this.loadData();
        this.showSpinner = false;
      }
    });
    this.showSpinner = false;
  }

  checkOrRejectActivity(status: boolean, activity: any) {
    const dialogRef = this.dialog.open(ModalValidarActComponent, {
      width: '30%',
      data: { status: status, activity: activity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == undefined) {
        this.loadData();
        this.showSpinner = false;
      } else {
        this.activitiesService.checkOrReject(result).subscribe(
          (response: any) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true);
              this.dataSource.data = [];
              this.loadData();
              this.ngOnInit();
            } else {
              this.alertService.showAlert(response.msg, false);
              this.loadData();
              this.ngOnInit();
            }
          },
          (error: any) => {
            console.error('Error al llamar al servicio:', error);
            this.showSpinner = false;
            this.alertService.showAlert('Error al llamar al servicio', true);
          }
        );
      }
    });
  }
}
