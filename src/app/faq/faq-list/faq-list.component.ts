import { filter, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  deleteFaq,
  getCategories,
  getFiltredFaq,
  setCategories,
  setFaq,
  setFiltredFaq,
} from './../../store/actions/faq.actions';
import {
  selectCategories,
  selectFiltredFaq,
} from './../../store/selectors/faq.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
let nextProcessId = 1;
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css'],
})
export class FaqListComponent implements OnInit {
  categories$ = this.store$.select(selectCategories);
  search = '';
  faqForm!: FormGroup;
  filtredFaq$ = this.store$.select(selectFiltredFaq);
  isFiltered = false;
  loading = true;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.faqForm = this.fb.group({
      name: [sessionStorage.getItem('faqFilter'), []],
    });
    if (this.faqForm.value.name != '' && this.faqForm.value.name != null) {
      this.isFiltered = true;
      this.store$.dispatch(getFiltredFaq({ name: this.faqForm.value.name }));
    } else this.store$.dispatch(getCategories());
    this.actions$
      .pipe(
        ofType(setCategories, setFaq),
        map(() => (this.loading = false))
      )
      .subscribe();
  }
  deleteFaq(faqId: number, categoryId: number) {
    this.store$.dispatch(deleteFaq({ faqId: faqId, categoryId: categoryId }));
  }
  editFaq(id: number) {
    this.router.navigate(['/faq/edit-faq/' + id]);
  }
  searchFaq() {
    if (this.faqForm.value.name != '' && this.faqForm.value.name != null) {
      this.loading = true;
      this.isFiltered = true;
      // отдать вопросы, удовлетворяющие поиску по слову в заголовке
      sessionStorage.setItem('faqFilter', this.faqForm.value.name);
      this.store$.dispatch(getFiltredFaq({ name: this.faqForm.value.name }));
    } else {
      this.isFiltered = false;
      this.store$.dispatch(getCategories());
    }
    this.actions$
      .pipe(
        ofType(setFaq),
        map(() => (this.loading = false))
      )
      .subscribe();
  }
}
