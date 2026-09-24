import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  password = '';

  constructor(private auth: Auth) {}

  iniciarSesion() {
    this.auth.login(this.correo, this.password).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem('token', respuesta.data);
        console.log('Token guardado correctamente');
      },
      error: (error) => {
        console.error('Error de login:', error);
      }
    });
  }

  // probarVehiculos() {
  //   this.auth.getVehiculos().subscribe({
  //     next: (respuesta) => {
  //       console.log('Vehículos:', respuesta);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //     }
  //   });
  // }
}