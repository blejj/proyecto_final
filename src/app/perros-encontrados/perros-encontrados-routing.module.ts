import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerrosEncontradosPage } from './perros-encontrados.page';

const routes: Routes = [
  {
    path: '',
    component: PerrosEncontradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerrosEncontradosPageRoutingModule {}
