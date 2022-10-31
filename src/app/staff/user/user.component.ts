import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { observable, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  public user = {

    'id': 3,
    "email": null,
    "name": null,
    "project": null,
    "post": null,
    "photo": null,
    "information": null,
    "admin": true
  };
  public isEdit = false;
  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  getUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getAPIUser(id).subscribe({
      next: (res: any) => this.user = res,
      error: (err) => alert(err.message)
    }
    )
    this.user = this.userService.getUser()
  }
  ngOnInit() {
    this.getUser()
    this.userForm = new FormGroup(
      {
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'name': new FormControl(this.user.name, [Validators.required]),
        'project': new FormControl(this.user.project, [Validators.required]),
        'post': new FormControl(this.user.post, [Validators.required]),
        // 'information': new FormControl(this.user.information, [Validators.required]),
        'admin': new FormControl(this.user.admin),

      }
    )
  }


  submitSaveUser() {
    this.user = { ...this.user, id: this.user.id, name: this.userForm.value.name, email: this.userForm.value.email, project: this.userForm.value.project, post: this.userForm.value.post, admin: this.userForm.value.admin }
    console.log(this.user)
    this.userService.putAPIUser(this.user)
    this.isEdit = false
  }
  submitEditUser() {
    this.isEdit = true
  }
  showDialogDelete(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }
  deleteUser() {
    console.log("Уволен!");
    this.userService.deleteAPIUser(this.user.id)
  }
}
