import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-registrar-act',
  templateUrl: './modal-registrar-act.component.html',
  styleUrl: './modal-registrar-act.component.css',
})
export class ModalRegistrarActComponent {
  isEditMode: boolean = false;
  editedData: any;
  idUser: any;
  nombreFormControl = new FormControl('', [Validators.required]);
  descripcionFormControl = new FormControl('', [Validators.required]);
  tipoActividadFormControl = new FormControl('', [Validators.required]);
  fechaActividadFormControl = new FormControl(new Date(), [
    Validators.required,
  ]);
  maxDate: Date = new Date();
  horasActividadFormControl = new FormControl('', [Validators.required]);
  horasActividadOptions: any[] = [];
  dayActivity: any;
  constructor(
    public dialogRef: MatDialogRef<ModalRegistrarActComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode || false;
    this.editedData = data.editedData || {};
    this.idUser = data.idUser;
    this.dayActivity = data.getDayActivity;
    this.generarHorasActividadOptions();
  }

  ngOnInit() {
    if (this.isEditMode) {this.loadEditModeData();}
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let dataUser: any;
    dataUser = {
      id: this.editedData.id_actividad,
      nombre_actividad: this.nombreFormControl.value,
      descripcion: this.descripcionFormControl.value,
      tipo_actividad: this.tipoActividadFormControl.value,
      fecha_actividad: this.dayActivity,
      horas_actividad: this.horasActividadFormControl.value,
      id_usuario_asignado: this.idUser,
    };
    this.dialogRef.close(dataUser);
  }

  isValidForm(): boolean {
    return !!(
      this.nombreFormControl.valid &&
      this.descripcionFormControl.valid &&
      this.tipoActividadFormControl.valid &&
      this.horasActividadFormControl.valid
    );
  }

  loadEditModeData() {
    this.nombreFormControl.setValue(this.editedData.nombre_actividad);
    this.descripcionFormControl.setValue(this.editedData.descripcion);
    this.tipoActividadFormControl.setValue(this.editedData.tipo_actividad);
    this.fechaActividadFormControl.setValue(this.editedData.fecha_actividad);
    this.horasActividadFormControl.setValue(this.convertHoursToString(this.editedData.horas_actividad));
    console.log(this.convertHoursToString(this.editedData.horas_actividad));

  }

  generarHorasActividadOptions() {
    for (let i = 1; i <= 9 * 2; i++) {
      const hour = Math.floor(i / 2);
      const minutes = i % 2 === 0 ? '00' : '30';
      const formattedTime = `${hour} hours ${minutes} minutes`;
      const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
      this.horasActividadOptions.push({ label: time, value: formattedTime });
    }
    console.log(this.horasActividadOptions);

  }

  myFilter = (d: Date | null): boolean => {
    const fechaActual = new Date();
    const fechaHaceUnaSemana = new Date();
    fechaHaceUnaSemana.setDate(fechaHaceUnaSemana.getDate() - 7);
    const date = d || new Date(); // Si d es null, se utiliza la fecha actual
    // Permitir seleccionar solo los días dentro de la última semana
    return date >= fechaHaceUnaSemana && date <= fechaActual;
  };

  agregarEvento(event: MatDatepickerInputEvent<Date>) {
    console.log('Fecha seleccionada:', event.value);
  }

  formatFecha(date: any) {
    return formatDate(date, 'Y-m-d', 'en-ES');
  }
  convertHoursToString(hourData: string): string {
    const [hourStr, minuteStr] = hourData.split(':');
    const hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    let message = '';
    if (hour > 0) {
      message += `${hour} hours`;
    }else{
      message += `0 hours`;
    }
    if (minutes > 0) {
      message += ` ${minutes} minutes`;
    }else{
      message += ` 00 minutes`
    }
    if (message === '') {
      message = ' 00 minutes';
    }
    return message;
  }
}
