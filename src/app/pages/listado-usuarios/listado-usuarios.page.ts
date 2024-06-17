import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {

  arregloUsuarios: any = [
    {
      id: '',
      nombre: '',
      contrasenna: ''
    }
  ]

  constructor(private router: Router,private servicioBD: ServicioDBService) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          this.arregloUsuarios = item;
        })
      }
    })
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.nombre,
        contrasennaEnviada: x.contrasenna
      }
    }
    this.router.navigate(['/listado-usuarios'],navigationExtras);
  }

  eliminar(x: any) {
    this.servicioBD.eliminarUsuario(x.id);
    this.servicioBD.presentToast("Usuario Eliminado");
  }

}
