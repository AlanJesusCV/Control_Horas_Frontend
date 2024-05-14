import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string, isError: boolean): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: isError ? 'error-alert' : 'success-alert'
    });
  }
}
