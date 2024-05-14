import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  private apiUrl = environment.API_URL; // URL de tu servicio de autenticación

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
      Accept: 'application/json',
    });

    return headers;
  }

  public getActivitiesByFilter(
    id: any,
    fechaInicio: any,
    fechaFin: any
  ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(
      this.apiUrl +
        '/activity/get-activities-by-period/' +
        id +
        '/' +
        fechaInicio +
        '/' +
        fechaFin,
      { headers }
    );
  }

  public getAcitivitesByUser(id: any, fechaActividad: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get(
      this.apiUrl +
        '/activity/get-activities-by-user/' +
        id +
        '/' +
        fechaActividad,
      { headers }
    );
  }

  public createActivity(activity: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl + '/activity/create-activity', activity, { headers });
  }

  public editActivity(activity: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl + '/activity/put-activity/' + id, activity, {
      headers,
    });
  }

  public checkOrReject(activity: any, ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl + '/activity/post-validate-activity', activity, {
      headers,
    });
  }

  public deleteActivity(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.apiUrl + '/activity/delete-activity/' + id, {
      headers,
    });
  }

  private getToken(): string {
    // Aquí implementa la lógica para obtener el token de autenticación
    return localStorage.getItem('token')!;
  }
}
