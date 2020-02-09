import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      licence: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required,]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: [''],
      password1: ['', Validators.required, Validators.minLength(5), Validators.maxLength(18)],
      password2: ['', Validators.required, this.validatePasswordSame]
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

  private submitLogin() {
    console.log('date: ', this.birthDate.value);
    // this.invalid = false;

    // this.doValidate(this.licenceField, this.licence)
    // this.doValidate(this.firstNameField, this.firstName)
    // this.doValidate(this.lastNameField, this.lastName)
    // this.doValidate(this.genderField, this.gender)
    // this.doValidate(this.birthDateField, this.birthDate)
    // this.doValidate(this.emailField, this.email)
    // this.doValidate(this.phoneField, this.phone)
    // this.doValidate(this.password1Field, this.password)
    // this.doValidate(this.password2Field, this.passwordCopy)

    // console.log('submit: ', this.invalid);
  }

  private validatePasswordSame(passControl: FormControl) {
    if (passControl.value === this.password.value) {
      return null;
    } else {
      return {
        validatePasswordSame: {
          valid: false
        }
      };
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
