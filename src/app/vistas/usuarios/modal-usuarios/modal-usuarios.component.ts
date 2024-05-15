import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrl: './modal-usuarios.component.css',
})
export class ModalUsuariosComponent {
  isEditMode: boolean = false;
  editedData: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  numeroEmpleadoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidosFormControl = new FormControl('', [Validators.required]);
  tipoFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode || false;
    this.editedData = data.editedData || {};
  }

  ngOnInit() {
    this.loadEditModeData();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let dataUser:any;
    if (this.isEditMode) {
      dataUser = {
        id: this.editedData.id,
        nombre: this.nombreFormControl.value,
        apellidos: this.apellidosFormControl.value,
        tipo: this.tipoFormControl.value,
      };
    } else {
      dataUser = {
        nombre: this.nombreFormControl.value,
        apellidos: this.apellidosFormControl.value,
        tipo: this.tipoFormControl.value,
        numero_empleado: this.numeroEmpleadoFormControl.value,
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
    }
    this.dialogRef.close(dataUser);
  }

  isValidForm(): boolean {
    if (this.isEditMode) {
      return !!(
        this.editedData.nombre &&
        this.editedData.apellidos &&
        this.editedData.tipo
      );
    } else {
      return !!(
        this.emailFormControl.valid &&
        this.apellidosFormControl.valid &&
        this.nombreFormControl.valid &&
        this.passwordFormControl.valid &&
        this.tipoFormControl.valid &&
        this.numeroEmpleadoFormControl.valid
      );
    }
  }

  loadEditModeData() {
    this.nombreFormControl.setValue(this.editedData.nombre);
    this.apellidosFormControl.setValue(this.editedData.apellidos);
    this.tipoFormControl.setValue(this.editedData.tipo);
  }
}
