import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from '../user-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  animations: [
    trigger('itemEnter', [
      transition('void => *', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class UserdetailComponent implements OnInit {
  detailForm: FormGroup;
  public duplicate = false;
  faEye = faEye;
  showPassword = false;
  toEdit = false;
  userDetails;
  constructor(
    private formBuilder: FormBuilder,
    private _userDataService: UserDataService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.detailForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, , Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );
    this.detailForm.controls.username.setErrors({
      duplicate: false
    });
    this.detailForm.disable();
    this._userDataService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
        this.detailForm.controls.username.setValue(res.userName);
        this.detailForm.controls.email.setValue(res.email);
      },
      err => {
        console.log(err);
      }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirm.value;
    let result = pass === confirmPass ? null : { notSame: true };
    return result;
  }

  onSubmit() {
    if (this.toEdit) {
      this._userDataService
        .modifyUser(
          this.detailForm.controls.username.value,
          this.detailForm.controls.email.value,
          this.detailForm.controls.password.value,
          this.detailForm.controls.passwordConfirm.value
        )
        .subscribe(
          (res: any) => {
            if (!res.succeeded) {
              res.errors.forEach(element => {
                switch (element.code) {
                  case 'DuplicateUserName':
                    this.detailForm.controls.username.setErrors({
                      duplicate: true
                    });
                    this.toEdit = true;
                    break;
                  default:
                    break;
                }
              });
            } else {
              var storage =
                localStorage.getItem('token') != null
                  ? localStorage
                  : sessionStorage;
              this._toastr.success('Personnal information successfully edited');
              storage.setItem(
                'username',
                this.detailForm.controls.username.value
              );
              this._router.navigateByUrl('/user/login');
            }
          },
          err => {
            console.log(err);
          }
        );
    }
    this.toEdit = !this.toEdit;
    if (this.toEdit) {
      this.detailForm.enable();
    }
  }

  mouseDown() {
    this.showPassword = true;
  }

  mouseUp() {
    this.showPassword = false;
  }
}
