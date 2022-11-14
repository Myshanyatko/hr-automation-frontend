import { addNewCategory } from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  saveCategory() {
    this.store$.dispatch(
      addNewCategory({ name: this.categoryForm.value.name })
    );
  }
}
