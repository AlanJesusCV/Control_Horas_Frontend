import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-validar-act',
  templateUrl: './modal-validar-act.component.html',
  styleUrl: './modal-validar-act.component.css',
})
export class ModalValidarActComponent {
  idUserSession = '';
  constructor(
    public dialogRef: MatDialogRef<ModalValidarActComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idUserSession = localStorage.getItem('id') || '';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let dataDec = {
      id_actividad: this.data.activity.id_actividad,
      validada: this.data.status == true ? true : false,
      id_validador: this.idUserSession,
    };
    this.dialogRef.close(dataDec);
  }
}
