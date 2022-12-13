import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserManagementService} from "../services/user-management.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId: number = 0;
  firstName: string;
  lastName: string;
  roles: String [] = [];
  username: string;
  can_create_users: boolean;
  can_read_users: boolean;
  can_update_users: boolean;
  can_delete_users: boolean;

  constructor(private route: ActivatedRoute, private userManagementService: UserManagementService) {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.can_read_users = false;
    this.can_create_users = false;
    this.can_update_users = false;
    this.can_delete_users = false;
  }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser() {
    this.route.params.subscribe(params => this.userId = params["userId"]);
    this.userManagementService.getUserById(this.userId).subscribe((user)=>{
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = user.username;

      if(user.roles.includes("can_create_users"))
        this.can_create_users = true;
      if(user.roles.includes("can_read_users"))
        this.can_read_users = true;
      if(user.roles.includes("can_update_users"))
        this.can_update_users = true;
      if(user.roles.includes("can_delete_users"))
        this.can_delete_users = true;
    })
  }

  updateUser(){
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
    this.userManagementService.updateUser(this.userId,this.firstName, this.lastName, this.username,this.roles)
      .subscribe((response) => {
        // alert(response)
      })
  }
}
