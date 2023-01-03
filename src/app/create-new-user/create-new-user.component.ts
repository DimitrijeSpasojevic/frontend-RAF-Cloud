import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../services/user-management.service";
import {Router} from "@angular/router";

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

  can_search_machines: boolean = false;
  can_create_machines: boolean = false;
  can_start_machines: boolean = false;
  can_destroy_machines: boolean = false;
  can_stop_machines: boolean = false;
  can_restart_machines: boolean = false;



  constructor(private userManagementService: UserManagementService, private router: Router) {
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

    if(this.can_create_machines){
      this.roles.push("can_create_machines")
    }
    if(this.can_start_machines){
      this.roles.push("can_start_machines")
    }
    if(this.can_stop_machines){
      this.roles.push("can_stop_machines")
    }
    if(this.can_restart_machines){
      this.roles.push("can_restart_machines")
    }
    if(this.can_search_machines){
      this.roles.push("can_search_machines")
    }
    if(this.can_destroy_machines){
      this.roles.push("can_destroy_machines")
    }

    if(!this.can_update_users && !this.can_delete_users && !this.can_read_users && !this.can_create_users){
      alert("User bez rola")
    }
    this.userManagementService.createNewUser(this.firstName, this.lastName, this.username,this.password,this.roles)
      .subscribe((response) => {
      // alert(response)
        this.router.navigate(['/users']);
      })
  }
}
