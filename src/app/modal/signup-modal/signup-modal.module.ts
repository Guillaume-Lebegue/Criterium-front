import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DateFormatter } from 'src/app/providers/dateFormatter';

import { SignupModalComponent } from './signup-modal.component';

@NgModule({
  declarations: [
    SignupModalComponent
  ],
  exports: [
    SignupModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: NgbDateParserFormatter, useValue: new DateFormatter}
  ]
})
export class SignupModalModule { }
