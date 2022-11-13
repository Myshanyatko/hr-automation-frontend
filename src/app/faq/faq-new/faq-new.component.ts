import {
  selectCategoriesName,
  selectCategoriesId,
} from './../../store/selectors/faq.selectors';
import { addNewFaq, getCategories } from './../../store/actions/faq.actions';
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
  categoriesName$ = this.store$.select(selectCategoriesName);
  categoriesId$ = this.store$.select(selectCategoriesId);

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    var categoryName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaa';
    this.store$.dispatch(getCategories());
    this.categoriesName$.subscribe((el) => (categoryName = el[0]));

    this.faqForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: new FormControl(categoryName),
    });
  }
  saveFaq() {
    var categoryId1 = 0;
    var categoryId2 = 0;
    this.categoriesName$.subscribe(
      (names) => (categoryId1 = names.indexOf(this.faqForm.value.category))
    );
    this.categoriesId$.subscribe((ides) => (categoryId2 = ides[categoryId1]));
    if (this.faq == null) {
      this.faq = {
        id: 0,
        title: this.faqForm.value.title,
        description: this.faqForm.value.description,
        categoryId: categoryId2,
      };
    }
    this.store$.dispatch(addNewFaq({ faq: this.faq }));
  }
}
