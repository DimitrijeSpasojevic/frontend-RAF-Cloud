import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllUsersComponent} from "./all-users/all-users.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: "users",
    component: AllUsersComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
