import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [ UserService ]
})

export class UserDetailComponent implements OnInit{
  users: User[];
  userslen: number;
  state: number = 0;
  message: String;


  @Input()
  user: User;


  constructor (private UserService: UserService) {
    this.user =  {
      _id: "",
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

  ngOnInit(){
    this.UserService
    .getUsers()
    .then((Users: User[]) => {
      this.users = Users.map((User) => {
        return User;
      });
      this.userslen = this.users.length;
    });
    
  }
  
  
  createUser(user: User) {
    if(user._id === ""){
      user._id = (this.userslen + 1).toString();
    }
    console.log(user);
    for(let key in user){
      if(user[key] == "" || user[key] == null){
        console.log(key, user[key]);
        this.state = 0;
        this.message = "Failed to register, please check details.";
        return;
      }
    }
    this.UserService.createUser(user).then(response => {
      this.state = 1;
      this.message = "Registered Successfully.";
    }, reject => {
      this.state = 0;
      this.message = "Failed to register, please check details.";
    });
  }

}