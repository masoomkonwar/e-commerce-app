import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password :string;
  constructor(private authService: SocialAuthService,private router :Router,private userService:UserServiceService,private route : ActivatedRoute) {

   }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState=>{
      if(authState)
      {this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile')}
      else
        {
          this.router.navigateByUrl('/login')
        }
    });

  }
  signInWithGoogle(){
    this.userService.googleLogin();
  }

  login(form : NgForm){
    const email = this.email;
    const password = this.password;
    if(form.invalid)
    return;
    form.reset;
    this.userService.loginUser(email,password)
  }



}