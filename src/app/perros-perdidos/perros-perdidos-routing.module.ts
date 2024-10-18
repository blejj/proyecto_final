import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerrosPerdidosPage } from './perros-perdidos.page';

const routes: Routes = [
  {
    path: '',
    component: PerrosPerdidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerrosPerdidosPageRoutingModule {}
