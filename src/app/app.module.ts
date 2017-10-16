import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './users/home/home.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ForgotPassComponent } from './users/forgot-pass/forgot-pass.component';
import { ErrorComponent } from './utility/error/error.component';

import { UserService } from './_services/user.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: UserDetailComponent, },
  { path: 'login/:logginin', component: LoginComponent},
  { path: 'fpass', component: ForgotPassComponent },
  { path: 'userprof', component: UserProfileComponent},
  { path: 'error', component: ErrorComponent},
  { path: 'login/:loginstate', component: LoginComponent}
];
//{ path: '**', component: AppComponent},
@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    ForgotPassComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule, 
    NgBootstrapFormValidationModule.forRoot() ,
    HttpModule, 
    RouterModule.forRoot( appRoutes )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
