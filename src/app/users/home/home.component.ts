import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit{
  currentUser: User;
  message: string = "Please login first.";

  constructor() { 
    setInterval(this.checkLoggedIn, 5000);
  }

  ngOnInit() {
    this.checkLoggedIn();
  }

  checkLoggedIn(){
    if(sessionStorage.getItem('token')){
      var curr;
      if (curr = sessionStorage.getItem('token')){
        curr = JSON.parse(curr);
        this.currentUser = curr.user;
        this.message = "Welcome " + this.currentUser.username;
      }
    }
    else{
      this.message = "Please login first.";
    }
  }
  

}
