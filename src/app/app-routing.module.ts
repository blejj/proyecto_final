import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// Acá lo que hacemos es definir las rutas correspondientes para cada tab. 
//Esto es crucial para que la navegación funcione correctamente.
//Si no está creado el .module. Hay que crear un ionic generate page de lo que querramos crear.
const routes: Routes = [
  {
    path: 'perros-perdidos',
    loadChildren: () => import('./perros-perdidos/perros-perdidos.module').then(m => m.PerrosPerdidosPageModule)
  },
  {
    path: 'perros-encontrados',
    loadChildren: () => import('./perros-encontrados/perros-encontrados.module').then(m => m.PerrosEncontradosPageModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },   {
    path: 'perros-perdidos',
    loadChildren: () => import('./perros-perdidos/perros-perdidos.module').then( m => m.PerrosPerdidosPageModule)
  },
  {
    path: 'perros-encontrados',
    loadChildren: () => import('./perros-encontrados/perros-encontrados.module').then( m => m.PerrosEncontradosPageModule)
  }
// Agrego la ruta para tabs
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
