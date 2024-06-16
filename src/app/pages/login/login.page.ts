import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: any;
  contrasenna: any;

  constructor(private navCtrl: NavController, private router: Router, private sanitizer: DomSanitizer) { }

  irAlHome(form: any) {
    if (form.valid) {
      let navigationExtras: NavigationExtras = {
        state: {
          nombreEnviado: this.usuario
        }
      }
      localStorage.setItem('user',this.usuario);
      this.router.navigate(['/home'],navigationExtras);
    } 
  }

  getImagePath(imageName: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${imageName}`);
  }

  ngOnInit() {
  }

}
