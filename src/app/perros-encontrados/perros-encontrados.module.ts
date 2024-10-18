import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerrosEncontradosPageRoutingModule } from './perros-encontrados-routing.module';

import { PerrosEncontradosPage } from './perros-encontrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerrosEncontradosPageRoutingModule
  ],
  declarations: [PerrosEncontradosPage]
})
export class PerrosEncontradosPageModule {}
