import { TuiDestroyService } from '@taiga-ui/cdk';
import { HttpClient } from '@angular/common/http';
import {
  selectProductsCategories,
  selectSelectedProduct,
} from './../../store/selectors/products.selectors';
import {
  addNewProduct,
  addNewProductSuccess,
  editProduct,
  editProductSuccess,
  getProduct,
  getProductsCategories,
} from './../../store/actions/products.actions';
import { addNewFaq } from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Product } from './../../models/product';
import { TuiFileLike } from '@taiga-ui/kit';
import { map, finalize, switchMap, filter, tap } from 'rxjs/operators';
import { timer, Observable, Subject, of, takeUntil } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

let nextProcessId = 1;
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [TuiDestroyService],
})
export class ProductEditComponent implements OnInit {
  id = -1;
  productForm!: FormGroup;
  errors = false;
  categories$ = this.store$.select(selectProductsCategories);
  product$ = this.store$.select(selectSelectedProduct);
  product: Product | null = null;

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
    this.productForm.get('category')?.setValue(categories[0])
      
    });
    this.product$.subscribe((product) => {
      this.product = product;
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
      map(() => {
        if (Math.random() > 0.5) {
          return file;
        }

        this.rejectedFiles$.next(file);

        return null;
      }),
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
      const processId = nextProcessId + 1;
      this.product$.pipe(map((prod) => {
        if (prod != null) {
          
          this.store$.dispatch(
            editProduct({
              product: {
                id: prod.id,
                ordered: prod.ordered,
                name: this.productForm.value.name,
                code: this.productForm.value.code,
                quantity: this.productForm.value.quantity,
                categoryId: this.productForm.value.category.id,
                photo: this.productForm.value.photo,
              },
              processId: processId,
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
          this.router.navigate(['/products']);
        });
    }
  }
}