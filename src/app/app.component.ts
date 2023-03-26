import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'hr-automation';
  str = ', ';

  constructor(public router: Router, public tokenService: TokenService) {}
  ngOnDestroy(): void {
    localStorage.clear();
  }
}
