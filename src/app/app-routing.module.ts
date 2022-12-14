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
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'key', canActivate: [KeyGuard], component: KeyComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'restorans', redirectTo: 'users', pathMatch: 'full' },
  { path: 'faq', component: FaqNewComponent, canActivate: [AuthGuard] },
  { path: 'faq-list', component: FaqListComponent, canActivate: [AuthGuard] },
  { path: 'products', redirectTo: 'users', pathMatch: 'full' },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
  {
    path: 'new-category',
    component: NewCategoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
