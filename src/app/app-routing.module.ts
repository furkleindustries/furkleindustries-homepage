import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes';

@NgModule({
  exports: [
    RouterModule,
  ],

  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
