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
export class AppComponent {
  title = 'hr-automation';
 
  

  constructor(public router: Router, private tokenService: TokenService, private eventBusService: EventBusService, private authService: AuthService) { }

}
