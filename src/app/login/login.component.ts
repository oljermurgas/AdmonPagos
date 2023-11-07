import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '123') {
      // Si las credenciales son válidas, redirigir a la página principal
      this.router.navigate(['/home']);
    } else {
      // Mostrar un mensaje de error en caso de credenciales incorrectas
      alert('Usuario o contraseña incorrectos.');
    }
  }
}
