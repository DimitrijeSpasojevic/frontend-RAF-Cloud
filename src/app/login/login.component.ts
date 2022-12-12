import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../services/user-management.service";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;
  email: string;
  password: string;

  constructor(private configService: ConfigService, private  userManagementService: UserManagementService) {
    this.token = this.configService.getToken();
    this.email = '';
    this.password = '';
  }


  ngOnInit(): void {
  }

  getToken(){
    return this.configService.getToken()
  }

  setToken(){
    this.configService.setToken(this.token);
  }

  login(){
    this.userManagementService.login(this.email,this.password).subscribe((response)=>{
      this.token = response.jwt
      this.setToken()
    })

  }
}


