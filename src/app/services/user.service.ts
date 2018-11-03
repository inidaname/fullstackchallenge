import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../routes/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUser = new BehaviorSubject<User>(null);
  userData = this.getUser.asObservable();

  constructor() { }

    user(user: User) {
        this.getUser.next(user);
    }

}
