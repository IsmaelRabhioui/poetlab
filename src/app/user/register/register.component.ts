import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { UserDataService } from 'src/app/user-data.service';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
  animations: [
    trigger('itemEnter', [
      transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  public toRegister1: FormGroup;
  public toRegister2: FormGroup;
  public toRegister3: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  public duplicate = false;
  faEye = faEye;
  showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userDataService: UserDataService,
    private _router: Router
  ) {
    this.toRegister1 = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.toRegister1.controls.username.setErrors({
      duplicate: false
    });

    this.toRegister2 = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.toRegister3 = this._formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['']
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirm.value;
    let result = pass === confirmPass ? null : { notSame: true };
    return result;
  }

  ngOnInit() {
    if (
      (localStorage.getItem('token') != null &&
        localStorage.getItem('logout') != 'true') ||
      sessionStorage.getItem('token') != null
    ) {
      this._router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this._userDataService
      .register(
        this.toRegister1.controls.username.value,
        this.toRegister2.controls.email.value,
        this.toRegister3.controls.password.value
      )
      .subscribe(
        (res: any) => {
          if (!res.succeeded) {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toRegister1.controls.username.setErrors({
                    duplicate: true
                  });
                  this.stepper.selectedIndex = 0;
                  break;
                default:
                  break;
              }
            });
          } else {
            this._router.navigateByUrl('/user/login');
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  mouseDown() {
    this.showPassword = true;
  }

  mouseUp() {
    this.showPassword = false;
  }
}
