import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.API_URL; // URL de tu servicio de autenticación

    constructor(private http: HttpClient,private router: Router ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/login', { email, password });
  }

  saveSession(token: string, userData: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('tipo', userData.tipo);
    localStorage.setItem('numero_emp', userData.numero_empleado);
    localStorage.setItem('id', userData.id);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserRole(): boolean {
    // Obtiene el perfil del usuario desde el almacenamiento local u otro lugar
    return localStorage.getItem('tipo') == 'Gerente' ? true :false ;
  }

  isLoggedIn(): boolean {
    // Verificar si el token existe en el localStorage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Limpiar el localStorage al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    localStorage.removeItem('numero_emp');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);

  }
}
