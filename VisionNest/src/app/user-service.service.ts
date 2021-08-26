import { Injectable } from '@angular/core';
import {SocialAuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  auth : boolean = localStorage.getItem('auth')=='true';
  private serverUrl : string = environment.SERVER_URL
  private user;
  authState$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth)
  userData$ : BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser | ResponseModel > (null)

  constructor(private authservice :SocialAuthService, private http : HttpClient) {
    authservice.authState.subscribe((user:SocialUser)=>{
      if(user != null){
        this.auth = true;
        this.authState$.next(this.auth)
        this.userData$.next(user)
      }
    });

    
    
   }
  loginUser(email : string , password : string){
      this.http.post("http://localhost:3300/api/auth/login",{
        email,password
      }).subscribe((data: ResponseModel)=>{
        this.auth = data.auth;
        this.authState$.next(this.auth)
        this.userData$.next(data)


      })
    }
googleLogin(){
  this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID)
}
logOut(){
  this.authservice.signOut();
  this.auth = false;
  this.authState$.next(this.auth)
}
registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
  const {fname, lname, email, password} = formData;
  console.log(formData);
  return this.http.post<{ message: string }>("http://localhost:3300/api/auth/register", {
    email,
    lname,
    fname,
    typeOfUser,
    password,
    photoUrl: photoUrl || null
  });
}

fetchUserData(userId:string){
  return  this.http.get<any>(this.serverUrl+'/users/validate/'+userId)
}
  
}
export interface ResponseModel{

    token : string;
    auth : boolean;
    email : string;
    username : string;
    fname : string;
    lname : string;
    photoUrl : string;
    userId : number
 }