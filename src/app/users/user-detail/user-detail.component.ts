import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UserService, NgForm]
})

export class UserDetailComponent implements OnInit {
  state: boolean = false;
  message: String;
  sub: any;
  myform: FormGroup;
  formGroup: FormGroup;

  @Input()
  user: User;

  constructor(private UserService: UserService) {
    this.initUser();
  }

  initUser() {
    this.user = {
      username: "",
      created: {
        date: new Date(),
      },
      roles: [
        "user"
      ],
      password: "",
      email: "",
      phone: "",
      name: "",
      profileData: new Object()
    };
  }

  ngOnInit() {
    this.initUser();
    this.formGroup = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z][a-zA-Z ]+/)
      ]),
      UserName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      Mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      ConfirmPassword: new FormControl('', [
        Validators.required
      ])
    });
  }

  createUser(user: User) {
    console.log(user);
    for (let key in user) {
      if (user[key] == "" || user[key] == null) {
        console.log(key, user[key]);
        this.state = false;
        this.message = "Failed to register, please check details.";
        return;
      }
    }
    this.UserService.createUser(user).then(response => {
      this.state = true;
      this.message = "Registered Successfully.";
      this.formGroup.reset();
      this.initUser();
    }, reject => {
      this.state = false;
      this.message = "Failed to register, please check details.";
    });
  }
}