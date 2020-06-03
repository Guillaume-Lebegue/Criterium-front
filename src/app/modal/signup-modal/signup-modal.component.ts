import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { AuthRestService } from '../../services/rest/auth/auth.service';
import { UserRestService } from 'src/app/services/rest/user/user.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
  animations: [
    trigger('changeStep', [
      state('1', style({transform: 'translateX(0%)'})),
      state('2', style({transform: 'translateX(-100%)'})),
      state('3', style({transform: 'translateX(-200%)'})),
      transition('1 => 2', [
        animate('350ms ease', style({transform: 'translateX(-100%)'}))
      ]),
      transition('2 => 3', [
        animate('350ms ease', style({transform: 'translateX(-200%)'}))
      ]),
      transition('3 => 2', [
        animate('350ms ease', style({transform: 'translateX(-100%)'}))
      ]),
      transition('2 => 1', [
        animate('350ms ease', style({transform: 'translateX(0)'}))
      ]),
    ]),
    trigger('visible', [
      state('yes', style({opacity: 1})),
      state('no', style({opacity: 0})),
      transition('no <=> yes', animate('350ms ease'))
    ])
  ]
})
export class SignupModalComponent implements OnInit {

  private signupForm: FormGroup;
  private invalid = false;

  private SearchCountryField = SearchCountryField;
  private TooltipLabel = TooltipLabel;
  private CountryISO = CountryISO;

  private step = 1;

  @ViewChild('licence', {static: false}) licenceField: ElementRef;
  @ViewChild('firstName', {static: false}) firstNameField: ElementRef;
  @ViewChild('lastName', {static: false}) lastNameField: ElementRef;
  @ViewChild('gender', {static: false}) genderField: ElementRef;
  @ViewChild('birthDate', {static: false}) birthDateField: ElementRef;
  @ViewChild('email', {static: false}) emailField: ElementRef;
  @ViewChild('phone', {static: false}) phoneField: ElementRef;
  @ViewChild('password1', {static: false}) password1Field: ElementRef;
  @ViewChild('password2', {static: false}) password2Field: ElementRef;

  constructor(
    private authRest: AuthRestService,
    private userRest: UserRestService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      licence: new FormControl('', {validators: [Validators.required]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      gender: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required]}),
      phone: new FormControl('', {validators: [Validators.required]}),
      password1: new FormControl('', {validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(18)
      ]}),
      password2: new FormControl('', {validators: [ 
        Validators.required,
        this.validatePasswordSame
      ]})
    })
  }

  private get licence(): AbstractControl {return this.signupForm.controls.licence};
  private get firstName(): AbstractControl {return this.signupForm.controls.firstName};
  private get lastName(): AbstractControl {return this.signupForm.controls.lastName};
  private get gender(): AbstractControl {return this.signupForm.controls.gender};
  private get birthDate(): AbstractControl {return this.signupForm.controls.birthDate};
  private get email(): AbstractControl {return this.signupForm.controls.email};
  private get phone(): AbstractControl {return this.signupForm.controls.phone};
  private get password(): AbstractControl {return this.signupForm.controls.password1};
  private get passwordCopy(): AbstractControl {return this.signupForm.controls.password2};


  private move(forward: boolean) {
    if (forward) {
      if (this.step < 3) this.step++
      else this.submitLogin();
    } else {
      if (this.step > 1) this.step--
      else this.activeModal.dismiss('Cancel')
    }
  }

  private async submitLogin() {
    const tmp = this.birthDate.value;
    const date = new Date(tmp.year, tmp.month, tmp.day);

    const signupData = {
      licence: this.licence.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      gender: this.gender.value,
      birthdate: date.toString(),
      email: this.email.value,
      password: this.password.value
    }

    console.log('signup with: ', signupData);

    try {
      const token = await this.authRest.signup(signupData).toPromise();
      this.authRest.setAuthTokens(token);
    } catch (error) {
      if (error.status === 409) {
        alert(error.error);
        this.step = 1
        return;
      } else {
        alert('Erreur serveur, veuillez réessayer plus tard');
        return;
      }
    }
    let user = await this.userRest.getUserByEmail(localStorage.getItem("loggedInUser")).toPromise();
    this.userRest.currentUser.next(user);
    this.activeModal.close('submit');
  }

  private validatePasswordSame = (passControl: FormControl): ValidationErrors => {
    console.log('this: ', this);
    if (!this.signupForm || passControl.value === this.password.value) {
      console.log('same');
      return null;
    } else {
      console.log('diff');
      return {
        notSame: true
      };
    }
  }

}
