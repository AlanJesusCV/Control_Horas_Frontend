import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../servicios/login/login.service';
import { AlertService } from '../../servicios/alertas/alerta.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SodiumService } from '../../servicios/sodium/sodium.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: LoginService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private encriptService: SodiumService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/actividades']); // Redirigir al usuario a la página de inicio si ya está autenticado
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password).subscribe(
        (response) => {
          if (response.error) {
            this.alertService.showAlert(response.msg, true);
          } else {
            let infoUser = response.response;
            this.authService.saveSession(infoUser.token, infoUser);
            this.alertService.showAlert(response.msg, false);
            this.router.navigate(['/actividades']);
          }
        },
        (error) => {
          console.error('Error al llamar al servicio:', error);
          this.alertService.showAlert('Error al llamar al servicio', true);
        }
      );
    }else{
      this.alertService.showAlert('Los campos correo electronico y contraseña son requeridos', true);
    }
  }

}
