import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/nova/all`)
  }

  public addUser(User: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/nova/add`, User)
  }
  public updateUser(User: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/nova/update`, User)
  }

  public deleteUser(UserId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/nova/delete/${UserId}`)
  }

}
