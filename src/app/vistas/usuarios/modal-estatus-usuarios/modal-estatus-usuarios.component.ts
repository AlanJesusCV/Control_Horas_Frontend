import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-estatus-usuarios',
  templateUrl: './modal-estatus-usuarios.component.html',
  styleUrl: './modal-estatus-usuarios.component.css',
})
export class ModalEstatusUsuariosComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalEstatusUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(){
    this.dialogRef.close(true);
  }
}
