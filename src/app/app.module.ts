import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SearchMachinesComponent } from './search-machines/search-machines.component';
import { ErrorsComponent } from './errors/errors.component';
import { CreateMachineComponent } from './create-machine/create-machine.component';
import { MachineActionComponent } from './machine-action/machine-action.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    LoginComponent,
    CreateNewUserComponent,
    EditUserComponent,
    SearchMachinesComponent,
    ErrorsComponent,
    CreateMachineComponent,
    MachineActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
