import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.page.html',
  styleUrls: ['./agendamiento.page.scss'],
})
export class AgendamientoPage implements OnInit {

  terapeuta: string="Carla";

  constructor(private navCtrl: NavController) { }

  agendamiento() {
    console.log('Agendando hora con el terapeuta...');
  }

  ngOnInit() {
  }

}
