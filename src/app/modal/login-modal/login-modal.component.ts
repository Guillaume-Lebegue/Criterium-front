import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthRestService } from 'src/app/services/rest/auth/auth.service';
import { UserRestService } from 'src/app/services/rest/user/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  private loginForm : FormGroup
  private invalid = false;

  @ViewChild('licence', {static: false}) licenceField: ElementRef
  @ViewChild('email', {static: false}) emailField: ElementRef
  @ViewChild('password', {static: false}) passwordField: ElementRef

  constructor(
    private authService: AuthRestService,
    private userService: UserRestService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private renderer : Renderer2
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      licenceOrEmail: [false],
      licence: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  private get licenceOrEmail(): AbstractControl { return this.loginForm.controls.licenceOrEmail; }
  private get email(): AbstractControl { return this.loginForm.controls.email };
  private get licence(): AbstractControl { return this.loginForm.controls.licence };
  private get password(): AbstractControl { return this.loginForm.controls.password };

  async submitLogin() {
    this.invalid = false;


    if (this.licenceOrEmail.value) this.doValidate(this.licenceField, this.licence)
    if (!this.licenceOrEmail.value) this.doValidate(this.emailField, this.email)
    this.doValidate(this.passwordField, this.password);

    console.log('invalid ?: ', this.invalid);
    if (this.invalid)
      return;
    
    const signinData = {
      email: this.email.value,
      password: this.password.value
    };

    try {
      const token = await this.authService.signin(signinData).toPromise();
      this.authService.setAuthTokens(token);
      const currUser = await this.userService.getUserByEmail(localStorage.getItem('loggedInUser')).toPromise();
      this.userService.currentUser.next(currUser);
      this.activeModal.close('submit');
    } catch (error) {
      if (error.status == 401)
        alert('Email ou mot de passe incorrect');
      else
        alert('Erreur serveur, veuillez réessayer plus tard');
    }
  }

  private doValidate(elementRef: ElementRef, control: AbstractControl) {
    if (control.invalid) {
      this.renderer.addClass(elementRef.nativeElement, 'is-invalid');
      this.invalid = true;
    } else {
      this.renderer.removeClass(elementRef.nativeElement, 'is-invalid');
    }
  }

}
