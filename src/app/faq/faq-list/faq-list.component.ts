import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import {
  deleteFaq,
  editFaq,
  getCategories,
} from './../../store/actions/faq.actions';
import { selectCategories } from './../../store/selectors/faq.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css'],
})
export class FaqListComponent implements OnInit {
  categories$ = this.store$.select(selectCategories);
  search = '';
  isEdited = false;
  constructor(private router: Router, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getCategories());
  }
  deleteFaq(faqId: number, categoryId: number) {
    this.store$.dispatch(deleteFaq({ faqId: faqId, categoryId: categoryId }));
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
}
