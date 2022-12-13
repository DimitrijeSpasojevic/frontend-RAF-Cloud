import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../services/user-management.service";
import {ResponseAllUsers, User} from "../model";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void{
    this.userManagementService.getAllUsers().subscribe((response)=>{
      this.users = response.users
      // console.log(this.users[0].username + ": users")
    })
  }

}
