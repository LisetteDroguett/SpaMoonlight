import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarioRec: any;

  constructor(private router:Router, private activedRouter:ActivatedRoute, private sanitizer: DomSanitizer) {
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRec = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
      }
    })
  }

  getLogoPath(imageName: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${imageName}`);
  }

  getImagePath(imageName: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/${imageName}`);
  }

}
