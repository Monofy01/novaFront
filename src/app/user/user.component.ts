import {Component, OnInit} from '@angular/core';
import {User} from "../user_service/user";
import {UserService} from "../user_service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];
  public editUser: User;
  public deleteUser: User;
  public imagePath: string | null;

  private imgData: string | ArrayBuffer | null;

  constructor(private userService: UserService, public _sanitizer: DomSanitizer) { }


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

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')!.click();
    addForm.value.img = this.imgData;
    console.log(addForm.value)

    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log('response');
        this.getAllUsers();
        addForm.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onFileLoad(data: any) {
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
}
