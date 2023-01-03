import { Component, OnInit } from '@angular/core';
import {MachineManagementService} from "../services/machine-management.service";
import {ConfigService} from "../services/config.service";
import {Machine, Message, User} from "../model";
import * as SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-search-machines',
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.css']
})
export class SearchMachinesComponent implements OnInit {

  machines: Machine[] = [];
  // @ts-ignore
  stompClient: CompatClient;
  machineId: number = 0;
  isConnected: boolean = false;
  nickname: string = '';
  newMessageText: string = '';
  messages: Message[] = [];

  constructor(private machineManagementService: MachineManagementService, public configService: ConfigService) { }

  ngOnInit(): void {
    this.getAllMachinesForLoggedUser()
    this.messages = [];
  }


  getAllMachinesForLoggedUser(): void{
    this.machineManagementService.getAllMachines().subscribe((response)=>{
      this.machines = response
    }, error => {
      alert(error)
    })
  }

  startMachine(machine: Machine):void{
    this.connect()
    this.machineId = machine.id
    this.machineManagementService.startMachine(machine.id).subscribe((response) => {
      // this.disconnect()
    }, error => {
      // this.disconnect()
    })
  }
  restartMachine():void{

  }
  connect() {
    const socket = new SockJS(`http://localhost:8080/ws?jwt=${this.configService.getToken()}`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect.bind(this));
  }

  onConnect(frame: any) {
    this.stompClient.subscribe('/topic/messages/' + this.machineId, this.addNewMessage.bind(this));
    this.isConnected = true;
    console.log('Connected: ' + frame);
  }
  addNewMessage(messageOutput: any) {
    console.log(JSON.parse(messageOutput.body))
    this.messages.push(JSON.parse(messageOutput.body));
  }

  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log("Disconnected");
  }
}
