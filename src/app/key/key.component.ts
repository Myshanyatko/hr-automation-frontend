import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  keyForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.keyForm = new FormGroup(
      {'key': new FormControl('', Validators.required)}
    )
    }

    submitBack(){
      this.router.navigate(['login']);
    }

    submitKey(){
      this.authService.getAPIKey(Number(this.keyForm.value.key))
      console.log(Number(this.keyForm.value.key))
    }

}
