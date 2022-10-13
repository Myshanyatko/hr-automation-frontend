import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  this.loginForm = new FormGroup(
    {'email': new FormControl('', [Validators.required, Validators.email])}
  )
  }

  submitLogin() {
    this.authService.getEmail(this.loginForm.value)
    
  }
}
