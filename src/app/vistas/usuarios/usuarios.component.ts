import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { AlertService } from '../../servicios/alertas/alerta.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalEstatusUsuariosComponent } from './modal-estatus-usuarios/modal-estatus-usuarios.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements  AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'numero_empleado',
    'email',
    'tipo',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  totalItems: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  showSpinner: boolean = true;
  currentPage = 1; // Página actual
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UsuariosService,
    public dialog: MatDialog,
    private alertService: AlertService,
    private router: Router
  ) {
    this.loadData();
    if (localStorage.getItem('tipo') != 'Gerente') {
      this.router.navigate(['/actividades']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.userService.getUsers().subscribe((users: any) => {
      //this.dataSource = new MatTableDataSource(users.response);
      this.dataSource.data = users.response
      this.totalItems = users.response.length;
      this.showSpinner = false;
    });
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '30%',
      data: { isEditMode: false }, // Modo de registro
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      console.log(result);

      if (result == undefined) {
        this.showSpinner = false;
      } else {
        this.userService.createUser(result).subscribe(
          (response) => {
            if (response.error) {
              this.showSpinner = false;
              this.alertService.showAlert(response.msg, true);
            } else {
              this.showSpinner = false;
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
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '30%',
      data: { isEditMode: true, editedData: dataToEdit }, // Modo de edición, pasando los datos del elemento a editar
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == undefined) {
        this.loadData();
        this.showSpinner = false;
      } else {
        console.log(result);
        this.userService.editUser(result, result.id).subscribe(
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
      // Aquí puedes manejar el resultado del modal para el registro
    });
    this.showSpinner = false;
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
    this.loadData();
  }

  disableUser(id: any, status: boolean) {
    const dialogRef = this.dialog.open(ModalEstatusUsuariosComponent, {
      width: '30%',
      data: { isEnable: status, idUser: id }, // Modo de edición, pasando los datos del elemento a editar
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result == true) {
        this.userService.disableOrEnableUser(id).subscribe(
          (response: any) => {
            if (response.error) {
              this.alertService.showAlert(response.msg, true); // Mostrar alerta de error
              console.log(response);
              this.showSpinner = false;
            } else {
              this.alertService.showAlert(response.msg, false); // Mostrar alerta de éxito
              this.loadData();
              this.showSpinner = false;
            }
          },
          (error: any) => {
            console.error('Error al llamar al servicio:', error);
            this.showSpinner = false;
            this.alertService.showAlert('Error al llamar al servicio', true); // Mostrar alerta de error
          }
        );
      }else{
        this.loadData();
        this.showSpinner = false;
      }
      // Aquí puedes manejar el resultado del modal para el registro
    });
    this.showSpinner = false;
  }
}
