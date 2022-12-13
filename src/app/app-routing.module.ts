import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllUsersComponent} from "./all-users/all-users.component";
import {LoginComponent} from "./login/login.component";
import {CreateNewUserComponent} from "./create-new-user/create-new-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

const routes: Routes = [
  {
    path: "users",
    component: AllUsersComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "createUser",
    component: CreateNewUserComponent
  },
  {
    path: "editUser/:userId",
    component: EditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
