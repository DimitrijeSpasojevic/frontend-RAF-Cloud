import { Component, OnInit } from '@angular/core';
import {MachineManagementService} from "../services/machine-management.service";
import {ConfigService} from "../services/config.service";
import {Machine, Message, User} from "../model";
import * as SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import jwt_decode from "jwt-decode";

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
  action: string = '';
  newMessageText: string = '';
  messages: Message[] = [];
  userId: number = 0

  constructor(private machineManagementService: MachineManagementService, public configService: ConfigService) {

  }

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
    this.action = "start";
    this.machineId = machine.id
    if(this.isConnected == false){
      this.connect();
    }else{
      this.start();
    }

  }
  restartMachine(machine:Machine):void{
    this.action = "restart";
    this.machineId = machine.id
    if(this.isConnected == false){
      this.connect();
    }else {
      this.restart();
    }
  }

  stopMachine(machine:Machine):void{
    this.action = "stop";
    this.machineId = machine.id
    if(this.isConnected == false){
      this.connect();
    }else {
        this.stop();
    }
  }

  destroyMachine(machine:Machine):void{
    this.machineId = machine.id
    this.machineManagementService.destroyMachine(machine.id).subscribe((response) => {
      this.getAllMachinesForLoggedUser()
      alert("Masina unistena")
    }, error => {
      // this.disconnect()
    })
  }

  connect() {
    if(this.isConnected == false){
      const socket = new SockJS(`http://localhost:8080/ws?jwt=${this.configService.getToken()}`);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, this.onConnect.bind(this));
    }
  }

  onConnect(frame: any) {
    let decodedToken = jwt_decode(this.configService.getToken());
    // @ts-ignore
    this.userId = decodedToken.userId;
    this.stompClient.subscribe('/topic/messages/' + this.userId, this.addNewMessage.bind(this));
    this.isConnected = true;
    console.log('Connected: ---------> ' + frame);

    if(this.action == "start"){
        this.start();
    }else if(this.action == "stop"){
        this.stop();
    }else if(this.action == "restart"){
        this.restart();
    }
  }

  addNewMessage(messageOutput: any) {
    console.log(JSON.parse(messageOutput.body))
    this.messages.push(JSON.parse(messageOutput.body));
    this.getAllMachinesForLoggedUser();
    if(JSON.parse(messageOutput.body).text != "masina u pola faze restartovanja"){
      // this.disconnect()
    }
  }

  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log("Disconnected");
  }

  start(){
    this.machineManagementService.startMachine(this.machineId).subscribe((response) => {
      alert("Zapocet proces startovanje, sacekajte.")
    }, error => {
      // this.disconnect()
    })
  }
  stop(){
    this.machineManagementService.stopMachine(this.machineId).subscribe((response) => {
      alert("Zapocet proces stop, sacekajte.")
    }, error => {
      // this.disconnect()
    })
  }

  restart(){
    this.machineManagementService.restartMachine(this.machineId).subscribe((response) => {
      alert("Zapocet proces restartovanje, sacekajte.")
    }, error => {
      // this.disconnect()
    })
  }
}
