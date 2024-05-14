import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-ver-descripcion',
  templateUrl: './modal-ver-descripcion.component.html',
  styleUrl: './modal-ver-descripcion.component.css'
})
export class ModalVerDescripcionComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalVerDescripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(){
    this.dialogRef.close(true);
  }
}
