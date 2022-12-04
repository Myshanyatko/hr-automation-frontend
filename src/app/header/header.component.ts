import { selectisLoginIn} from './../store/selectors/auth.selectors';
import { AppState } from './../store/state/app.state';
import { Store } from '@ngrx/store';
import { EventBusService } from './../shared/event-bus.service';
import { TokenService } from './../services/token.service';
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
import { logout } from '../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  eventBusSub?: Subscription;
  isLoggedIn = false;
  loggedIn$ = this.store$.select(selectisLoginIn)
  username = this.tokenService.getUsername()
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;

  constructor(
    public router: Router,
    private eventBusService: EventBusService,
    private store$: Store<AppState>,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getAccessToken()) {
      this.isLoggedIn = true;
    }
    this.username = this.tokenService.getUsername();
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe();
  }
  open = false;
  logout(): void {
    this.store$.dispatch(logout())
    this.isLoggedIn = false;
    this.open = false;
    this.component?.nativeFocusableElement?.focus();

  }

  openProfile() {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
    const id = this.tokenService.getUserId();
    this.router.navigate(['user/', id]);
  }
}
