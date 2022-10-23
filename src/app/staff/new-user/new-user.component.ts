import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit {
  createUserForm!: FormGroup;
  user = {'id': 1,
  "email": null,
  "name": null,
  "project": null,
  "post": null,
  "photo": null,
  "information": null,
  "admin": true};
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
  private userService: UsersService) { }

  ngOnInit(): void {
    this.createUserForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.required, Validators.email]),
        'name': new FormControl('', [Validators.required]),
        'project': new FormControl('', [Validators.required]),
        'post': new FormControl('', [Validators.required]),
        'admin': new FormControl(false),
        
      })
  }
  submitSaveUser(content: PolymorpheusContent<TuiDialogContext>){
    this.user = { ...this.user, name: this.createUserForm.value.name, email: this.createUserForm.value.email, project: this.createUserForm.value.project, post: this.createUserForm.value.post, admin: this.createUserForm.value.admin }
    this.userService.postAPIUser(this.user);
    console.log('new user is created');
    this.dialogService.open(content).subscribe();
    this.ngOnInit()
  }

  

}
