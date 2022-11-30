import { deleteProduct, getProductsCategories } from './../../store/actions/products.actions';
import { selectProductsCategories } from './../../store/selectors/products.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsComponent implements OnInit {
  categories$ = this.store$.select(selectProductsCategories)
  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
this.store$.dispatch(getProductsCategories())
  }
  editProduct(id: number){
    
  }
  deleteProduct(id: number, categoryId: number){
    this.store$.dispatch(deleteProduct({id: id, categoryId: categoryId}))
  }

}
