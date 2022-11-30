import { FormControl } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { getOrderedProducts } from './../../store/actions/products.actions';
import { selectOrderedProducts } from './../../store/selectors/products.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-products-ordered',
  templateUrl: './products-ordered.component.html',
  styleUrls: ['./products-ordered.component.css'],
})
export class ProductsOrderedComponent implements OnInit {
  url = '';
  readonly control = new FormControl();
  products$ = this.store$.select(selectOrderedProducts);
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getOrderedProducts());
  }
  deleteProduct(id: number) {
    console.log('delete');
  }

  submitProducts() {
    const url = URL.createObjectURL(this.control.value);
    const element = document.getElementById('link');
    element?.setAttribute('href', url);
    if (element != null) element.click();
  }
}
