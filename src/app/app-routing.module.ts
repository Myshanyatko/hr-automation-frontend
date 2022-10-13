import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { KeyComponent } from './key/key.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
   {path: 'key', component: KeyComponent},
   {path: '', canActivate: [AuthGuard], canDeactivate: [AuthGuard],
   component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
