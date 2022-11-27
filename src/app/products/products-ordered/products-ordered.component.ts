import { getOrderedProducts } from './../../store/actions/products.actions';
import { selectOrderedProducts } from './../../store/selectors/products.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-products-ordered',
  templateUrl: './products-ordered.component.html',
  styleUrls: ['./products-ordered.component.css']
})
export class ProductsOrderedComponent implements OnInit {
products$ = this.store$.select(selectOrderedProducts)
  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.dispatch(getOrderedProducts())
  }

}
