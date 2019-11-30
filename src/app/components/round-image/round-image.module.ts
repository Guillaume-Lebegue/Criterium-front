import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundImageComponent } from './round-image.component';



@NgModule({
  declarations: [
    RoundImageComponent
  ],
  exports: [
    RoundImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoundImageModule { }
