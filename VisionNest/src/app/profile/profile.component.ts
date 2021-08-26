import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserServiceService, ResponseModel } from '../user-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myUser : any;
  userData : any;
  isSocialUser : boolean = false;
  email:string
  fname:string
  lname:string
  age:string
  constructor(
    private authservice: SocialAuthService,
    private userService : UserServiceService,
    private router : Router

  ) { }

  ngOnInit(): void {
      this.fname = localStorage.getItem('first name')
      this.lname = localStorage.getItem('last name')
      this.email = localStorage.getItem('email')
    this.userService.userData$.pipe(
      map(user=>{
        if(user instanceof SocialUser)
        {
          this.isSocialUser = true;
          return{
            ...user,
            email : 'test@testmail.com'
            
          };
        }
        else{
          return user
        }
      })
    ).subscribe((data:ResponseModel | SocialUser)=>{
      this.myUser = data;
      
        if(this.isSocialUser){
        localStorage.setItem('Authtoken',this.myUser.authToken);
        localStorage.setItem('email',this.myUser.email);
        localStorage.setItem('auth',this.myUser.auth);
        localStorage.setItem('first name',this.myUser.firstName);
        localStorage.setItem('last name',this.myUser.lastName);
        localStorage.setItem('auth','true');
        this.fname = localStorage.getItem('first name')
        this.lname = localStorage.getItem('last name')
        this.email = localStorage.getItem('email')
        }
        else{
        console.log(this.isSocialUser)
        localStorage.setItem('token',this.myUser.token);
        localStorage.setItem('email',this.myUser.email);
        localStorage.setItem('auth',this.myUser.auth);
        this.userService.fetchUserData(this.myUser.email).subscribe(userdata=>{
        this.userData = userdata;
        
        localStorage.setItem('first name',this.userData.user.fname);
        localStorage.setItem('last name',this.userData.user.lname);
        this.fname = localStorage.getItem('first name')
        this.lname = localStorage.getItem('last name')
        this.email = localStorage.getItem('email')
        
          console.log(this.userData)
        
        })
      }
        
      
        
      
      console.log(this.myUser)
    })
  }

  logout()
  {
    localStorage.removeItem('Authtoken')
    localStorage.removeItem('first name')
    localStorage.removeItem('last name')

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('auth');

    this.router.navigate(['/login'])
        this.userService.logOut();
  }
}
