import { Component, OnInit } from '@angular/core';
import {MachineManagementService} from "../services/machine-management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  name: string = "";

  constructor(private machineManagementService:MachineManagementService, private router: Router) { }

  ngOnInit(): void {
  }

  createMachine(){
    this.machineManagementService.createMachine(this.name)
      .subscribe((response) => {
         alert("Machine \"" + response.name + "\" is created")
        this.router.navigate(['/search']);
      })
  }

}
