import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState : boolean;

  constructor(private userService : UserServiceService){

  }
  ngOnInit() : void{
    this.userService.authState$.subscribe( (authSt : boolean )=>{
      this.authState = authSt
      console.log(this.authState)
    })
  }

}
