import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
   
    {
      path: '',
    
      loadChildren: () =>
      import('./pages/layout/layout.module').then((m) => m.LayoutModule),
    },
  
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' },
  
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
