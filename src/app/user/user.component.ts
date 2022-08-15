import {Component, OnInit} from '@angular/core';
import {UserService} from "../user_service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import { User } from '../user_service/user';
import {PageEvent} from "@angular/material/paginator";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[];
  public editUser: User;
  public deleteUser: User;
  public pageSlice: User[];
  private imgData: string | ArrayBuffer | null;

  public statusList: string[] = ['Active', 'Inactive']
  public selectedData = 'Inactive'

  public listEmails: string[] = [];


  constructor(private userService: UserService, public _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        console.log(response)
        this.users = response;
        this.pageSlice = this.users.slice(0,10);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')!.click();
    addForm.value.img = this.imgData;
    // console.log(addForm.value)

    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        this.getAllUsers();
        addForm.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onAddEmail(email: string) {
    this.listEmails.push(email);
  }

  public onUpdateUser(user: User, source: any): void {
    console.log(user)
    console.log(source)

    user.status = <unknown>user.status == 'Active';

    if (user.img == "") { // no subieron cosas, se pone la misma imagen, osea source
      user.img = source;
      this.userService.updateUser(user).subscribe((response: User) => {
        this.getAllUsers();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      })
    } else { // si subiste cosas
      if (typeof this.imgData === "string") {
        user.img = this.imgData;
        this.userService.updateUser(user).subscribe((response: User) => {
          this.getAllUsers();
        }, (error: HttpErrorResponse) => {
          alert(error.message);
        })
      } else {
        alert('error')
      }
    }

  }

  public onFileLoad(data: any) {
    console.log(data)
    this.imgData = "";
    let fileList = (<HTMLInputElement>data.target).files;
    if (fileList && fileList.length > 0) {
      let file: File = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgData = reader.result;
      };
    }
  }

    public onOpenModalUser(user: User, mode: string) {

      const container = document.getElementById('user-container');

      const trueValue = document.getElementById('active')
      const falseValue = document.getElementById('false')

      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      this.editUser = user;
      if (mode === 'edit') {
        this.editUser = user
        if (this.editUser.status) {
          this.selectedData = 'Active'
        }
        button.setAttribute('data-target', '#updateUserModal');
      }
      if (mode === 'delete') {
        console.log('test')
        this.deleteUser = user;
        button.setAttribute('data-target', '#deleteUserModal');
      }
      container!.appendChild(button);
      button.click();
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log('response');
        this.getAllUsers();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) {
      endIndex = this.users.length;
    }
    this.pageSlice = this.users.slice(startIndex, endIndex);
    console.log(this.pageSlice)
  }

}
