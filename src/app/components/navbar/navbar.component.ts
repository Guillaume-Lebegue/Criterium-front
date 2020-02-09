import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/modal/login-modal/login-modal.component';
import { SignupModalComponent } from 'src/app/modal/signup-modal/signup-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  
  openLoginModal() {
    this.modalService.open(LoginModalComponent).result.then(
      result => {
        console.log('good: ', result);
      }, reason => {
        console.log('dismmised: ', reason);
      }
    )
  }

  openSignupModal() {
    this.modalService.open(SignupModalComponent).result.then(
      result => {
        console.log('good: ', result);
      }, reason => {
        console.log('dismmised: ', reason);
      }
    )
  }

}
