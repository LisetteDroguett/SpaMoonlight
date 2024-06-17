import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicioDBService {

  public database!: SQLiteObject;
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, contrasenna VARCHAR(6) NOT NULL);";
  registroUsuario: string = "INSERT or INGORE INTO usuario(id_usuario,nombre,contrasenna) VALUES (1,'Lisette','123456');";
  listaUsuarios = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) {
    this.crearBD();
   }

  async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 4000,
      icon: 'globe'
    });
    await toast.present();
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdusuarios.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentToast("Error BD: " + e);
      })
    })
  }

  async crearTablas() {
    try{
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.registroUsuario, []);
      this.buscarUsuario();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }
  }

  buscarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.lenght; i++) {
          items.push({
            id: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            contrasenna: res.rows.item(i).contrasenna
          })
        }
      }
      this.listaUsuarios.next(items as any);
    })
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  insertarUsuario(nombre: any, contrasenna: any) {
    let data = [nombre,contrasenna];
    return this.database.executeSql('INSERT INTO usuario(nombre,contrasenna) VALUES(?.?)', data).then(res=>{
      this.buscarUsuario();
    });
  }

  modificarUsuario(id: any, nombre: any, contrasenna: any) {
    let data = [nombre,contrasenna,id];
    return this.database.executeSql('UPDATE usuario SET nombre = ?,contrasenna = ? WHERE id_usuario = ?',data).then(data2=>{
      this.buscarUsuario();
    })
  }

  eliminarUsuario(id: any) {
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(a=>{
      this.buscarUsuario();
    })
  }

}
