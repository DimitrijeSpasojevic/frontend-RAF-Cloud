import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllUsersComponent} from "./all-users/all-users.component";
import {LoginComponent} from "./login/login.component";
import {CreateNewUserComponent} from "./create-new-user/create-new-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {ReadAuthGuard} from "./read-auth.guard";
import {CreateAuthGuard} from "./create-auth.guard";
import {UpdateAuthGuard} from "./update-auth.guard";
import {SearchMachinesComponent} from "./search-machines/search-machines.component";
import {CreateMachineComponent} from "./create-machine/create-machine.component";
import {ErrorsComponent} from "./errors/errors.component";
import {MachineActionComponent} from "./machine-action/machine-action.component";

const routes: Routes = [
  {
    path: "users",
    component: AllUsersComponent,
    canActivate: [ReadAuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "createUser",
    component: CreateNewUserComponent,
    canActivate: [CreateAuthGuard]
  },
  {
    path: "editUser/:userId",
    component: EditUserComponent,
    canActivate: [UpdateAuthGuard]
  },
  {
    path: "search",
    component: SearchMachinesComponent
  },
  {
    path: "createMachine",
    component: CreateMachineComponent
  },
  {
    path: "errors",
    component: ErrorsComponent
  },
  {
    path: "machineAction/:machineId",
    component: MachineActionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
