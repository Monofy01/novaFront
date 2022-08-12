import { Component, OnInit } from '@angular/core';
import {User} from "../user_service/user";
import {UserService} from "../user_service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];
  public editUser: User;
  public deleteUser: User;

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        console.log(response)
        this.users = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
