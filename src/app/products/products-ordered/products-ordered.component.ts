import { Product } from './../../models/product';
import { Actions, ofType } from '@ngrx/effects';
import { map, takeUntil, tap } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {
  TuiDay,
  TuiDestroyService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  addOrderedProduct,
  addOrderedProductSuccess,
  deleteOrderedProduct,
  getFile,
  getOrderedProducts,
  getProducts,
} from './../../store/actions/products.actions';
import {
  selectOrderedProducts,
  selectFile,
  selectAllProducts,
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
  productForm!: FormGroup;
  products$ = this.store$.select(selectOrderedProducts);
  allProducts$ = this.store$.select(selectAllProducts);
  errors = false;
  loading = false;
  value: readonly string[] = [];
  today =
    `Заказанные продукты на ` +
    new Date().getDate() +
    '.' +
    (new Date().getMonth() + 1) +
    '.xls';

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product: [],
    });
    this.allProducts$.subscribe((products) => {
      if (products != null)
        this.productForm.addControl('product', new FormControl(products[0]));
    });
    this.store$.dispatch(getOrderedProducts());
    this.store$.dispatch(getProducts());
  }
  deleteProduct(id: number) {
    this.store$.dispatch(deleteOrderedProduct({ id: id }));
  }
  addProducts() {
    if (this.productForm.get('product')?.invalid) {
      this.errors = true;
    } else {
      this.loading = true;
      this.store$.dispatch(
        addOrderedProduct({
          idList: this.productForm.value.product.map(
            (product: Product) => product.id
          ),
          callback: () => {
            this.loading = false;
          },
        })
      );
      this.actions$
        .pipe(
          ofType(addOrderedProductSuccess),
          map(() => {
            this.store$.dispatch(getOrderedProducts());
            this.loading = false;
          })
        )
        .subscribe();
      this.errors = false;
    }
  }
  
  submitProducts() {
    // формирование имени файла с текущей датой
    this.today =
      `Заказанные продукты на ` +
      new Date().getDate() +
      '.' +
      (new Date().getMonth() + 1) +
      '.xls';
      // кнопка переходит в состояние загрузки
    this.download = true;
    // находим элемент с id "link"
    const element = document.getElementById('link');
    // получаем файл, помещаем в store
    this.store$.dispatch(getFile());
    // "забираем файл" из store
    const file = this.store$.select(selectFile);
    // подписываемся на поток данных "file"
    file.pipe(
        tap((file) => {
          if (file != null) {
            // создаем object URL для файла
            const url = URL.createObjectURL(file);
            // динамически добавляем атрибут к DOM-элементу
            element?.setAttribute('href', url);
            // создаем имитацию клика по ссылке
            if (element != null) element.click();
            URL.revokeObjectURL(url);
            // кнопка переходит в обыычное состояние
            this.download = false;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  get content(): string {
    return `Выбрано ${this.value.length} продуктов`;
  }
}
