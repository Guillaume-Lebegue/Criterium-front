import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RoundImageModule } from '../round-image/round-image.module';
import { NavbarComponent } from './navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RoundImageModule
  ]
})
export class NavbarModule { }
