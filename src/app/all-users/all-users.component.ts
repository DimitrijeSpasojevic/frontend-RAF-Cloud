import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../services/user-management.service";
import {ResponseAllUsers, User} from "../model";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userManagementService: UserManagementService, public configService: ConfigService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void{
    this.userManagementService.getAllUsers().subscribe((response)=>{
      this.users = response.users
      // console.log(this.users[0].username + ": users")
    }, error => {
      alert(error)
    })
  }

  deleteUser(user: User){
    this.userManagementService.deleteUserById(user.userId).subscribe((response)=>{
      // console.log(this.users[0].username + ": users")
      this.getAllUsers()
    },error => {

    })
  }

}
