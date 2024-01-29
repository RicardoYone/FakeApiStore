import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User | null = null;
  userUpdated = new Subject<User | null>();

  setUser(user: User) {
    this.currentUser = user;
    this.userUpdated.next(this.currentUser);
  }

  getUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    this.userUpdated.next(this.currentUser); // Emite null para indicar que el usuario ha cerrado sesión
  }
}
