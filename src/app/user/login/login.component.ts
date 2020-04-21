import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  NgForm
} from '@angular/forms';
import { UserDataService } from 'src/app/user-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {
  public tologin: FormGroup;
  faUser = faUser;
  faKey = faKey;
  remember: boolean;
  username = '';

  constructor(
    private _userDataService: UserDataService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.tologin = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem('rememberMe') != 'false' &&
      localStorage.getItem('username') != null
    ) {
      this.tologin.controls.username.setValue(localStorage.getItem('username'));
      this.tologin.controls.password.setValue('********');
      this.remember = localStorage.getItem('rememberMe') == 'true';
    }

    if (
      (localStorage.getItem('token') != null &&
        localStorage.getItem('logout') != 'true') ||
      sessionStorage.getItem('token') != null
    ) {
      this._router.navigateByUrl('/home');
    }
  }

  onSubmit(form: NgForm) {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('username') == form.form.get('username').value &&
      '********' == form.form.get('password').value
    ) {
      localStorage.setItem('logout', 'false');
      this._router.navigateByUrl('/home');
    } else {
      this._userDataService.login(form.value).subscribe(
        (res: any) => {
          if (this.remember) {
            localStorage.setItem('username', form.form.get('username').value);
            localStorage.setItem('token', res.token);
            localStorage.setItem('logout', 'false');
          } else {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('username', form.form.get('username').value);
          }
          this._router.navigateByUrl('/home');
        },
        err => {
          if (err.status === 400) {
            this._toastr.error(
              'Incorrect username or password',
              'Authentication failed'
            );
          } else if (
            form.form.get('username').value == null ||
            form.form.get('password') == null
          ) {
            this._toastr.error('Please enter a username and password');
          } else {
            this._toastr.error(
              'Something went wrong: ' + err.statusText,
              'Please try again later'
            );
          }
        }
      );
    }
  }

  checkCheckBoxvalue($event) {
    this.remember = $event.target.checked;
    localStorage.setItem('rememberMe', this.remember.toString());
    if (!this.remember) {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      this.tologin.controls.username.reset();
      this.tologin.controls.password.reset();
    } else {
      this.username = localStorage.getItem('username');
    }
  }
}
