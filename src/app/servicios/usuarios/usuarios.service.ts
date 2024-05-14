import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = environment.API_URL; // URL de tu servicio de autenticación

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
      Accept: 'application/json',
    });
    console.log(this.getToken());

    return headers;
  }

  public getUsers(): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get(this.apiUrl + '/user/get-users-general', { headers });
  }

  public getUsersAutoComplete(): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get(this.apiUrl + '/user/get-users-autocomplete', { headers });
  }

  public createUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl + '/user', user, { headers });
  }

  public editUser(user: any, id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl + '/user/put-update/' + id, user, {
      headers,
    });
  }

  public disableOrEnableUser(id: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.post(this.apiUrl + '/user/put-enable/' + id, [], { headers });
  }

  private getToken(): string {
    // Aquí implementa la lógica para obtener el token de autenticación
    return localStorage.getItem('token')!;
  }

  // Implementa otros métodos HTTP según sea necesario (put, delete, etc.)
}
