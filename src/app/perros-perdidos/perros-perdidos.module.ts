import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerrosPerdidosPageRoutingModule } from './perros-perdidos-routing.module';

import { PerrosPerdidosPage } from './perros-perdidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerrosPerdidosPageRoutingModule
  ],
  declarations: [PerrosPerdidosPage]
})
export class PerrosPerdidosPageModule {}
