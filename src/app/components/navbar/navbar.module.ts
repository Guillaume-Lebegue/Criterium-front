import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/modal/login-modal/login-modal.component';
import { LoginModalModule } from 'src/app/modal/login-modal/login-modal.module';
import { SignupModalComponent } from 'src/app/modal/signup-modal/signup-modal.component';
import { SignupModalModule } from 'src/app/modal/signup-modal/signup-modal.module';

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
    RouterModule,
    RoundImageModule,
    NgbModule,
    LoginModalModule,
    SignupModalModule
  ],
  entryComponents: [
    LoginModalComponent,
    SignupModalComponent
  ]
})
export class NavbarModule { }
