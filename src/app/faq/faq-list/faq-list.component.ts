import { DialogService } from './../../services/dialog.service';
import { deleteFaq, getCategories } from './../../store/actions/faq.actions';
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
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getCategories());
  }
  deleteFaq(faqId: number, categoryId: number) {
    console.log('delete faq');

    this.store$.dispatch(deleteFaq({ faqId: faqId, categoryId: categoryId }));
  }
}
