import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

import * as M from 'materialize-css';
import { AuthService } from 'src/app/services/auth-service.service';
declare var $: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('titleBar') titleBar;
  @ViewChild('loginPiky') loginPiky;
  @ViewChild('loginFb') loginFb;
  @ViewChild('loginEth') loginEth;
  @ViewChild('fromContainer') formContainer;
  @ViewChild('tab1') tab1;
  @ViewChild('tab2') tab2;
  showLogin = true;
  myEmailValidator = '';
  myPasswordValidator = '';
  errMsg = '';
  loginLogo = '../../assets/img/PikyLogoCerc.png';
  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;
  show = false;

  constructor(private render: Renderer2, private router: Router, private elRef: ElementRef, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      password : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.email , Validators.required])
    });
    this.registerForm =  new FormGroup({
      password : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.email, Validators.required])
    });
  }

  shakeFrom() {
    this.render.addClass(this.formContainer.nativeElement, 'shake');
    setTimeout(() => {
      this.render.removeClass(this.formContainer.nativeElement, 'shake');
    }, 1000);
  }

  moveTitleBar(button: ElementRef) {
    this.render.addClass(this.titleBar.nativeElement, 'bounce');
    this.render.addClass(this.titleBar.nativeElement, 'infinite');
    this.render.addClass(button.nativeElement, 'disabled');
  }

  stopTitleBar(button: ElementRef) {
    this.render.removeClass(this.titleBar.nativeElement, 'bounce');
    this.render.removeClass(button.nativeElement, 'disabled');
  }

  throwErr(message, type?) {
    switch (type) {
      case 'email':
      this.myEmailValidator = 'invalid';
      break;
      case 'password':
      this.myPasswordValidator = 'invalid';
      break;
      default:
        this.myEmailValidator = 'invalid';
        this.myPasswordValidator = 'invalid';
    }
    this.show = true;
    this.errMsg = message;
    this.render.removeClass(this.titleBar.nativeElement, 'bounce');
    this.shakeFrom();
    this.stopTitleBar(this.loginPiky);
  }

  removeErr() {
    this.myEmailValidator = '';
    this.myPasswordValidator = '';
    this.show = false;
    this.errMsg = '';
  }


  login() {
    if (!this.loginForm.get('email').valid) {
      this.throwErr('email', 'Invalid Email');
    } else if (!this.loginForm.get('password').valid) {
      this.removeErr();
      this.throwErr('Invalid passowrd', 'password');
    }
    if (this.loginForm.valid) {
      this.removeErr();
      this.moveTitleBar(this.loginPiky);
      this.user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(this.user).subscribe(res => {
        console.log('ggwp');
        this.stopTitleBar(this.loginPiky);
      }, err => {
        console.log(err);
        this.throwErr(err.message);
        this.stopTitleBar(this.loginPiky);
      });
    }
  }


  register() {
    if (!this.registerForm.get('email').valid) {
      this.throwErr('Invalid Email', 'email');
    } else if (!this.registerForm.get('password').valid) {
      this.removeErr();
      this.throwErr('Invalid passowrd', 'password');
    }
    if (this.registerForm.valid) {
      this.removeErr();
      this.user = {
        username: this.registerForm.value.email.split('@')[0],
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.authService.register(this.user).subscribe(res => {
        console.log('ggwp');
        this.stopTitleBar(this.loginPiky);
      }, err => {
        console.log(err);
        this.throwErr(err.message);
        this.stopTitleBar(this.loginPiky);
      });
    }
  }

  cleanForms(form: string) {
    if (form === 'login') {
      this.loginForm.reset();
      this.myEmailValidator = '';
      this.myPasswordValidator = '';
      this.show = false;
      this.errMsg = '';
      this.showLogin = false;

    } else {
      this.registerForm.reset();
      this.myEmailValidator = '';
      this.myPasswordValidator = '';
      this.show = false;
      this.errMsg = '';
      this.showLogin = true;
    }
  }

  fbLogin() {
    this.moveTitleBar(this.loginFb);
  }

  ethLogin() {
    this.moveTitleBar(this.loginEth);
  }

  onHo(target: string, hovering: boolean) {

    if (hovering) {

      switch (target) {
        case 'piky':
          this.loginLogo = '../../assets/img/PikyLogoCerc.png';
          break;

        case 'eth':
          this.loginLogo = '../../assets/img/ethLogo.png';
          break;

        case 'fb':
          this.loginLogo = '../../assets/img/fb.png';
          break;
      }

    } else {
      this.loginLogo = '../../assets/img/PikyLogoCerc.png';
    }
  }

  ngAfterViewInit() {
    M.Tabs.init(this.elRef.nativeElement.querySelector('.tabs'));
  }

}
