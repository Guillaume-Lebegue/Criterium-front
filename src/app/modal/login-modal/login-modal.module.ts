import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToggleModule } from '@nth-cloud/ng-toggle';


@NgModule({
  declarations: [
    LoginModalComponent
  ],
  exports: [
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgToggleModule,
  ]
})
export class LoginModalModule { }
