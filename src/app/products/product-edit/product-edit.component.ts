import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  selectProductsCategories,
  selectSelectedProduct,
} from './../../store/selectors/products.selectors';
import {
  editProduct,
  editProductSuccess,
  getProduct,
  getProductsCategories,
} from './../../store/actions/products.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Product } from './../../models/product';
import { TuiFileLike } from '@taiga-ui/kit';
import { map, finalize, switchMap, filter, tap, take } from 'rxjs/operators';
import { timer, Observable, Subject, of, takeUntil } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

let nextProcessId = 1;
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [TuiDestroyService],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id = -1;
  loading = false;
  productForm!: FormGroup;
  errors = false;
  categories$ = this.store$.select(selectProductsCategories);
  product$ = this.store$.select(selectSelectedProduct);

  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );
  constructor(
    private actions$: Actions,
    private destroy$: TuiDestroyService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getProductsCategories());
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.id = Number(id);
          this.store$.dispatch(getProduct({ id: Number(id) }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      quantity: [[Validators.required]],
      category: [[Validators.required]],
    });

    this.categories$.subscribe((categories) => {
      if (categories != null)
        this.productForm.get('category')?.setValue(categories[0]);
    });
    this.product$.subscribe((product) => {
      for (var i in product) {
        this.productForm.get(i)?.setValue(product[i as keyof Product]);
      }
    });
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }
  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => file),
      finalize(() => this.loadingFiles$.next(null))
    );
  }
  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  saveProduct() {
    if (
      this.productForm.get('name')?.invalid ||
      this.productForm.get('quantity')?.invalid ||
      this.productForm.get('code')?.invalid ||
      this.productForm.get('category')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const processId = nextProcessId + 1;
      this.product$
        .pipe(
          take(1),
          map((prod) => {
            if (prod != null) {
              if (this.control.value != null) {
                var fd = new FormData();
                fd.append('file', this.control.value);
                this.store$.dispatch(
                  editProduct({
                    product: {
                      id: prod.id,
                      ordered: prod.ordered,
                      name: this.productForm.value.name,
                      code: this.productForm.value.code,
                      quantity: this.productForm.value.quantity,
                      categoryId: this.productForm.value.category.id,
                      pictureUrl: prod.pictureUrl,
                    },
                    processId: processId,
                    photo: fd,
                    callback: () => {
                      this.loading = false;
                    },
                  })
                );
              } else
                this.store$.dispatch(
                  editProduct({
                    product: {
                      id: prod.id,
                      ordered: prod.ordered,
                      name: this.productForm.value.name,
                      code: this.productForm.value.code,
                      quantity: this.productForm.value.quantity,
                      categoryId: this.productForm.value.category.id,
                      pictureUrl: prod.pictureUrl,
                    },
                    processId: processId,
                    photo: null,
                    callback: () => {
                      this.loading = false;
                    },
                  })
                );
            }
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
      this.errors = false;

      this.actions$
        .pipe(
          ofType(editProductSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/products/products-list']);
        });
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
