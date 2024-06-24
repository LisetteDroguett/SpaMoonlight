import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = "";
  contrasenna: string = "";

  constructor(private router: Router, private db: ServicioDBService, private toastController: ToastController) { }

  ngOnInit() {
  }

  enviarDatos() {
    this.db.insertarUsuario(this.nombre,this.contrasenna);
    this.db.presentToast("Usuario Agregado");
    this.router.navigate(['/login']);
  }

}
