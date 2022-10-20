import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  keyForm!: FormGroup;
  token: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.keyForm = new FormGroup(
      {'key': new FormControl('')}
    )
    }

   

    submitKey(){
      this.authService.getAPIKey(this.keyForm.value)
    }

}
