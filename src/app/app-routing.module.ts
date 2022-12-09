import { RestoransComponent } from './restorans/restorans.component';
import { ProductsOrderedComponent } from './products/products-ordered/products-ordered.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductNewComponent } from './products/product-new/product-new.component';
import { EditUserComponent } from './staff/edit-user/edit-user.component';
import { ProductsComponent } from './products/products-list/products-list.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { NewCategoryComponent } from './faq/new-category/new-category.component';
import { FaqListComponent } from './faq/faq-list/faq-list.component';
import { FaqNewComponent } from './faq/faq-new/faq-new.component';
import { NewUserComponent } from './staff/new-user/new-user.component';
import { UserComponent } from './staff/user/user.component';
import { StaffComponent } from './staff/staff.component';
import { KeyGuard } from './guards/key.guard';
import { AuthGuard } from './guards/auth.guard';
import { KeyComponent } from './key/key.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: StaffComponent, canActivate: [AuthGuard] },
  {
    path: 'users/user/:id',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'key', canActivate: [KeyGuard], component: KeyComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'restorans',
    component: RestoransComponent,
    canActivate: [AuthGuard],
  },
  { path: 'faq/faq-new', component: FaqNewComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FaqListComponent, canActivate: [AuthGuard] },
  {
    path: 'products/products-list',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsOrderedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/product-new',
    component: ProductNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/new-user',
    component: NewUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/edit-user/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/edit-product/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faq/edit-faq/:id',
    component: FaqEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'faq/new-category',
    component: NewCategoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
