import { UserComponent } from './staff/user/user.component';
import { StaffComponent } from './staff/staff.component';
import { KeyGuard } from './guards/key.guard';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { KeyComponent } from './key/key.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: StaffComponent, canActivate: [AuthGuard]},
  
    {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
   {path: 'key', canActivate: [KeyGuard], component: KeyComponent},
   {path: '', canActivate: [AuthGuard], 
   component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
