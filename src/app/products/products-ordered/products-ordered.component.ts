import { map, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import {
  getFile,
  getOrderedProducts,
} from './../../store/actions/products.actions';
import {
  selectOrderedProducts,
  selectFile,
} from './../../store/selectors/products.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-products-ordered',
  templateUrl: './products-ordered.component.html',
  styleUrls: ['./products-ordered.component.css'],
  providers: [TuiDestroyService],
})
export class ProductsOrderedComponent implements OnInit {
  download = false;
  readonly control = new FormControl();
  products$ = this.store$.select(selectOrderedProducts);
  constructor(
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getOrderedProducts());
  }
  deleteProduct(id: number) {
    console.log('delete');
  }

  submitProducts() {
    this.download = true;
    this.store$.dispatch(getFile());
    const element = document.getElementById('link');
    const file = this.store$.select(selectFile);
    file
      .pipe(
        tap((file) => {
          if (file != null) {
            const url = URL.createObjectURL(file)
            element?.setAttribute('href', url);
            if (element != null) element.click();
            URL.revokeObjectURL(url)
            this.download = false;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }
 
}
