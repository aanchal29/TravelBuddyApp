import { Component, Input, OnInit, ViewChild  } from '@angular/core';
import { User } from '../user';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ UserService, NgForm]
})

export class UserProfileComponent implements OnInit{

  regState: boolean = undefined;
  message: String = undefined;
  sub: any;
  user: User;

  constructor (private UserService: UserService, private route: ActivatedRoute, private router: Router) {}


  initUser(){
    this.user = {
      name: "",
      username: "",
      created: {
        date: new Date()
      },
      email: "",
      phone: "",
      password: "",
      roles: ['user'],
      profileData: {}
    };
  }
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
  /* states: any = [];
  cities: any = [];
  loading: boolean = false;
  profileData: {
  	originAddress: {
      city: string;
      state: string[2];
      zip: string;
    };
    originTime: Date;
    destinationAddress: {
      city: string;
      state: string[2];
      zip: string;
    };
    destinationTime: Date;
    bio: string;
    profilePic: string;
  };
  users: User[]; */
  
  	/* this.profileData = {
  		originAddress: {
        city: "",
        state: "",
        zip: ""
      },
      originTime: new Date(),
      destinationAddress: {
        city: "",
        state: "",
        zip: ""
      },
      destinationTime: new Date(),
      bio: "",
      profilePic: ""
    };
    var temp = this.LocationService.getStates();
    for(let state in temp){
      this.states.push(temp[state]);
    }
  } */

  

  /* onSelect(){
    if(this.profileData.originAddress.state){
      this.loading = true;
      this.profileData.originAddress.state = this.LocationService.getState(this.profileData.originAddress.state);
      console.log(this.profileData.originAddress.state);
      this.LocationService.getCities(this.profileData.originAddress.state).then((response)=>{
        var x = response._body.substring(1, response._body.length - 1);
        x = JSON.parse(x);
        var result = x.result;
        for(let x in result){
          this.cities.push(result[x].City);
        }
        this.cities = this.cities.filter((elem, index)=>{
          return index == this.cities.indexOf(elem);
        });
        this.loading = false;
      });
    }
  }

  onSubmit(){
  	console.log(this.profileData);
  } */

}