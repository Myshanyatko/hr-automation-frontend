import { filter, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  deleteFaq,
  deleteFaqSuccess,
  editFaq,
  getCategories,
  getFiltredFaq,
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
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.faqForm = this.fb.group({
      name: ['', []],
    });
    this.store$.dispatch(getCategories());
  }
  deleteFaq(faqId: number, categoryId: number) {
    const processId = nextProcessId + 1;
    this.actions$.subscribe(() =>
      pipe(
        ofType(deleteFaqSuccess),
        filter((action) => action.processId === processId),
        tap(() => {
          return this.router.navigate(['faq-edit']);
        })
      )
    );
    this.store$.dispatch(
      deleteFaq({ faqId: faqId, categoryId: categoryId, processId: processId })
    );
  }
  editFaq(id: number, title: string, description: string, categoryId: number) {
    const faq = { id, title, description, categoryId };

    this.store$.dispatch(
      editFaq({
        faq: faq,
      })
    );
    this.router.navigate(['edit-faq']);
  }
  searchFaq() {
    if (this.faqForm.value.name != '') {
    }
    console.log(this.faqForm.value.name);
    // отдать вопросы, удовлетворяющие поиску по слову в заголовке
    this.store$.dispatch(getFiltredFaq({ name: 'name' }));
  }
}
