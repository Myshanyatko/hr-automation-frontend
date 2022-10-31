import { EventBusService } from './../shared/event-bus.service';
import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  eventBusSub?: Subscription;
  isLoggedIn = false;
  username?: string;

  constructor(
    public router: Router,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getAccessToken();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {
      this.username = this.tokenService.getAuthUserName();
      console.log(this.username);
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();

    this.isLoggedIn = false;
  }
}
