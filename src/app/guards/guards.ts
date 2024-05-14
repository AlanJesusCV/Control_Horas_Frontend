import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Usuario autenticado, permitir acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir al componente de inicio de sesión si el usuario no está autenticado
      return false;
    }
  }
}
