import { Category } from './../../models/category';
import { initialFaqState } from './../../store/state/faq.state';
import { addNewFaq } from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

import { Faq } from './../../models/faq';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq-new.component.html',
  styleUrls: ['./faq-new.component.css'],
})
export class FaqNewComponent implements OnInit {
  faq!: Faq;

  faqForm!: FormGroup;

  categores: Category[] = [
    { id: 1, category: 'разное' },
    { id: 2, category: 'офис' },
    { id: 3, category: 'конференция' },
  ];
  categoresName = this.categores.map((el) => el.category);
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.faqForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: new FormControl(this.categores[1].category),
    });
    console.log(this.categoresName);
  }
  saveFaq() {
    if (this.faq == null) {
      this.faq = {
        id: 0,
        title: this.faqForm.value.title,
        description: this.faqForm.value.description,
        categoryId:
          this.categores.find(
            (el) => el.category === this.faqForm.value.category
          )?.id || 1,
      };
      this.store$.dispatch(addNewFaq({ faq: this.faq }));
    }
  }
}
