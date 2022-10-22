import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from './services/token.service';
import { EventBusService } from './shared/event-bus.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'hr-automation';
  eventBusSub?: Subscription;
  isLoggedIn = false;
  username?: string;

  constructor(public router: Router, private tokenService: TokenService, private eventBusService: EventBusService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getAccessToken();

    if (this.isLoggedIn) {
      const user = this.tokenService.getAuthUser();
      this.username = user.username;
    }
    
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

   
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
