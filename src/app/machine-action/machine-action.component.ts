import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Machine} from "../model";
import {OwlDateTime} from "ng-pick-datetime/date-time/date-time.class";
import {MachineManagementService} from "../services/machine-management.service";

@Component({
  selector: 'app-machine-action',
  templateUrl: './machine-action.component.html',
  styleUrls: ['./machine-action.component.css']
})
export class MachineActionComponent implements OnInit {
  machineId: number = 0;
  dateTime: any;
  constructor(private route: ActivatedRoute, private  machineService:MachineManagementService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.machineId = params["machineId"]);
    console.log(this.machineId + " machine");
  }

  scheduleAction(): void{

    console.log(this.dateTime.getTime() + " dateTime")
  }

  scheduleStart() {
    this.machineService.scheduleStart(this.machineId, this.dateTime.getTime()).subscribe((response) => {
      alert("Machine is scheduledStarted")
    });
  }

  scheduleRestart() {
    this.machineService.scheduleRestart(this.machineId, this.dateTime.getTime()).subscribe((response) => {
      alert("Machine is scheduledRestart")
    });
  }

  scheduleStop() {
    this.machineService.scheduleStop(this.machineId, this.dateTime.getTime()).subscribe((response) => {
      alert("Machine is scheduledStopped")
    });
  }
}
