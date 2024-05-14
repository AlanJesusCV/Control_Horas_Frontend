import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-eliminar-act',
  templateUrl: './modal-eliminar-act.component.html',
  styleUrl: './modal-eliminar-act.component.css'
})
export class ModalEliminarActComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarActComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(){
    this.dialogRef.close(true);
  }
}
