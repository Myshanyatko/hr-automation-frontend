import { environment } from './../environments/environment';
import { appReducers } from './store/reducers/app.reducers';
import { USersEffects } from './store/effects/users.effects';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiLabelModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiSvgModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiDropdownModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiPushModule,
  TuiAccordionModule,
  TuiActionModule,
  TuiToggleModule,
  TuiAvatarModule,
  TuiFieldErrorPipeModule,
  TuiArrowModule,
} from '@taiga-ui/kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KeyComponent } from './key/key.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaffComponent } from './staff/staff.component';
import { UserComponent } from './staff/user/user.component';
import { NewUserComponent } from './staff/new-user/new-user.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { EditUserComponent } from './staff/edit-user/edit-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TuiLetModule } from '@taiga-ui/cdk';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KeyComponent,
    StaffComponent,
    UserComponent,
    NewUserComponent,
    HeaderComponent,
    MenuComponent,
    EditUserComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiInputModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiFieldErrorPipeModule,
    TuiAvatarModule,
    TuiToggleModule,
    TuiLabelModule,
    TuiActionModule,
    TuiAccordionModule,
    TuiPushModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiArrowModule,
    TuiHostedDropdownModule,
    TuiDropdownModule,
    TuiLetModule,
    TuiNotificationModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([USersEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
