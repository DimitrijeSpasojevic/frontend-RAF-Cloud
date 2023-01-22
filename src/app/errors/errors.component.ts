import { Component, OnInit } from '@angular/core';
import {MyError} from "../model";
import {MyErrorService} from "../services/my-error.service";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  myErrors: MyError[] = []

  constructor(private myErrorService: MyErrorService) { }

  ngOnInit(): void {
    this.getMyErrors();
  }



  getMyErrors(): void{
    this.myErrorService.getAllErrorsByUser().subscribe((response) => {
      this.myErrors = response.errorMessages
    })
  }
}
