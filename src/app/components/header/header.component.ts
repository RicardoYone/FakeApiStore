import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  users: User | null = null;
  private userSub: Subscription = Subscription.EMPTY;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSub = this.userService.userUpdated.subscribe(
      (user: User | null) => {
        this.users = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.userService.logout();
  }
}
