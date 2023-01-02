import { Component, OnInit } from '@angular/core';
import {MachineManagementService} from "../services/machine-management.service";
import {ConfigService} from "../services/config.service";
import {Machine, User} from "../model";

@Component({
  selector: 'app-search-machines',
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.css']
})
export class SearchMachinesComponent implements OnInit {

  machines: Machine[] = [];

  constructor(private machineManagementService: MachineManagementService, public configService: ConfigService) { }

  ngOnInit(): void {
    this.getAllMachinesForLoggedUser()
  }


  getAllMachinesForLoggedUser(): void{
    this.machineManagementService.getAllMachines().subscribe((response)=>{
      this.machines = response
    }, error => {
      alert(error)
    })
  }
}
