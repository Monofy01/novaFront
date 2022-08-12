import { Component } from '@angular/core';
import {User} from "./user_service/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'novaFront';

  public onOpenModal(user: User, mode: string) {
    const container = document.getElementById('user-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    container!.appendChild(button);
    button.click();
  }


}
