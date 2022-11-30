import { HttpClient } from '@angular/common/http';
import { selectProductsCategories } from './../../store/selectors/products.selectors';
import {
  addNewProduct,
  addNewProductSuccess,
  getProductsCategories,
} from './../../store/actions/products.actions';
import { addNewFaq } from './../../store/actions/faq.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Product } from './../../models/product';
import { TuiFileLike } from '@taiga-ui/kit';
import { map, finalize, switchMap, filter } from 'rxjs/operators';
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
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  errors = false;
  loading = false;
  categories$ = this.store$.select(selectProductsCategories);

  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getProductsCategories());

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.minLength(1)]],
    });

    this.categories$.subscribe((categories) => {
      if (categories == null) return null;
      else {
        return this.productForm.addControl(
          'category',
          new FormControl(categories[0], [Validators.required])
        );
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
      if (this.loading == false) this.loading = true;
      const product: Product = {
        id: 0,
        name: this.productForm.value.name,
        code: this.productForm.value.code,
        quantity: this.productForm.value.quantity,
        categoryId: this.productForm.value.category.id,
        photo: this.productForm.value.photo,
        ordered: false,
      };

      const processId = nextProcessId + 1;
      this.store$.dispatch(
        addNewProduct({ product: product, processId: processId })
      );
      this.errors = false;

      this.actions$
        .pipe(
          ofType(addNewProductSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
