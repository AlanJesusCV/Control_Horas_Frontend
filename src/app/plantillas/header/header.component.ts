import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userProfile = ''
  constructor(private authService: LoginService) {
  this.userProfile = localStorage.getItem('tipo') || '';

  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Implementa esta función en tu servicio de autenticación para verificar si el usuario está logueado
  }

  getUserRole(): boolean {
    return this.authService.getUserRole(); // Implementa esta función en tu servicio de autenticación para verificar si el usuario está logueado
  }

  logout(): void {
    this.authService.logout(); // Implementa esta función en tu servicio de autenticación para cerrar sesión
  }
}
