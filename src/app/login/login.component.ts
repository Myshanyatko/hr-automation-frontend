import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
        provide: TUI_VALIDATION_ERRORS,
        useValue: {
            required: `Enter this!`,
            email: `Enter a valid email`,
        },
    },
]
})
export class LoginComponent implements OnInit {

//   readonly loginForm = new FormGroup({
//     testValue: new FormControl(`mail@mail.ru`),
// });

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
  this.loginForm = new FormGroup(
    {'email': new FormControl('', [Validators.required, Validators.email])}
  )
  }

  submitLogin() {
   
    this.authService.getAPIEmail(this.loginForm.value.email)
    
  }

}
// export class LoginComponent {
//   readonly testForm = new FormGroup({
//       testValue: new FormControl(`mail@mail.ru`),
//   });
// }
