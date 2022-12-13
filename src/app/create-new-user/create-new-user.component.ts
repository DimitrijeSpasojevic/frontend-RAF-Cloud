import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../services/user-management.service";
import {CreateUser} from "../model";
import {AlertComponent, AlertConfig} from "ngx-bootstrap/alert";

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  firstName: string;
  lastName: string;
  password: string;
  roles: String [] = [];
  username: string;
  can_create_users: boolean;
  can_read_users: boolean;
  can_update_users: boolean;
  can_delete_users: boolean;

  constructor(private userManagementService: UserManagementService) {
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.username = '';
    this.can_read_users = false;
    this.can_create_users = false;
    this.can_update_users = false;
    this.can_delete_users = false;
  }


  ngOnInit(): void {
  }


  createUser() {
    if(this.firstName == '' ||  this.lastName == '' || this.password == ''){
      alert("Popuni obavezna polja")
      return
    }
    if(this.can_create_users){
      this.roles.push("can_create_users")
    }
    if(this.can_read_users){
      this.roles.push("can_read_users")
    }
    if(this.can_delete_users){
      this.roles.push("can_delete_users")
    }
    if(this.can_update_users){
      this.roles.push("can_update_users")
    }
    if(!this.can_update_users && !this.can_delete_users && !this.can_read_users && !this.can_create_users){
      alert("User bez rola")
    }
    this.userManagementService.createNewUser(this.firstName, this.lastName, this.username,this.password,this.roles)
      .subscribe((response) => {
      // alert(response)
    })
  }
}
