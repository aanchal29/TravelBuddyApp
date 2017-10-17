import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UserService, NgForm]
})

<<<<<<< HEAD
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
=======

export class UserDetailComponent implements OnInit{
  regState: boolean = undefined;
  message: String = undefined;
  sub: any;
  confirmpassword: string;
  user: User;

  constructor (private UserService: UserService, private route: ActivatedRoute, private router: Router) {}


  initUser(){
    this.user = {
      name: "",
      username: "",
      created: {
        date: new Date()
>>>>>>> 6f912d7a907b51dcd3e2de60407b48ad3a5955ae
      },
      email: "",
      phone: "",
      password: "",
      roles: ['user'],
      profileData: {}
    };
  }
<<<<<<< HEAD

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
=======
  ngOnInit(){
    this.initUser();  
    
    this.sub = this.route.params.subscribe(params => {
      //console.log(params);
      if(params['regstate'] == "false"){
        this.regState = false;
        this.message = "Failed to register, please check details.";
      }
      else if(params['regstate'] == "true"){
        this.regState = true;
        this.message = "Registered Successfully.";
        this.initUser();
      }
      else if(params['regstate'] == "undefined"){
        this.message = "Please enter your details."
      }
      setTimeout(()=>{
        this.message = undefined;
      }, 10000);
    });
  }
  
  createUser() {
    for(let key in this.user){
      if(this.user[key] == ""){
        console.log("KEY: " + key);
        this.message = "Invalid input";
        this.regState = false;
        setTimeout(()=>{
          this.message = undefined;
          this.regState = undefined;
        }, 5000)
        return;
      }
    }
    this.UserService.createUser(this.user).then(success=>{
      if(success){
        this.router.navigate(['/signup/true']);
      }
    }, reject=>{
      if(reject){
        this.router.navigate(['/signup/false']);
      }
    });    
>>>>>>> 6f912d7a907b51dcd3e2de60407b48ad3a5955ae
  }
}