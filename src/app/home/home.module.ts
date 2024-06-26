import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BotonComponent } from '../components/boton/boton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatProgressBarModule
  ],
  declarations: [HomePage, BotonComponent]
})
export class HomePageModule {}
