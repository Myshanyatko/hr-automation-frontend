import { EventBusService } from './../shared/event-bus.service';
import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  eventBusSub?: Subscription;
  isLoggedIn = false;
  username?: string;
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;

  constructor(
    public router: Router,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getAccessToken()) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    }

    // if (this.isLoggedIn) {
    this.username = this.tokenService.getAuthUserName();
    console.log(this.username);
    // }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe();
  }
  open = false;
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }

  OpenProfile() {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
    this.router.navigate(['user/', 2]);
  }
}
