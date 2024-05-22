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
  numberEmployeeFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  nameEmployeeFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);

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
        nombre: this.nameEmployeeFormControl.value,
        apellidos: this.lastNameFormControl.value,
        tipo: this.typeFormControl.value,
      };
    } else {
      dataUser = {
        nombre: this.nameEmployeeFormControl.value,
        apellidos: this.lastNameFormControl.value,
        tipo: this.typeFormControl.value,
        numero_empleado: this.numberEmployeeFormControl.value,
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
        this.lastNameFormControl.valid &&
        this.nameEmployeeFormControl.valid &&
        this.passwordFormControl.valid &&
        this.typeFormControl.valid &&
        this.numberEmployeeFormControl.valid
      );
    }
  }

  loadEditModeData() {
    this.nameEmployeeFormControl.setValue(this.editedData.nombre);
    this.lastNameFormControl.setValue(this.editedData.apellidos);
    this.typeFormControl.setValue(this.editedData.tipo);
  }
}
