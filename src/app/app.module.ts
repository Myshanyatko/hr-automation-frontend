import { ProductsEffects } from './store/effects/products.effects';
import { FaqEffects } from './store/effects/faq.effects';
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
  TuiTextfieldControllerModule,
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
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiTextAreaModule,
  TuiInputFilesModule,
  TuiInputDateModule,
  TuiInputNumberModule
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
import { FaqNewComponent } from './faq/faq-new/faq-new.component';
import { FaqListComponent } from './faq/faq-list/faq-list.component';
import { NewCategoryComponent } from './faq/new-category/new-category.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { ProductsComponent } from './products/products-list/products-list.component';
import { ProductNewComponent } from './products/product-new/product-new.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductsOrderedComponent } from './products/products-ordered/products-ordered.component';
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
    FaqNewComponent,
    FaqListComponent,
    NewCategoryComponent,
    FaqEditComponent,
    ProductsComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductsOrderedComponent,
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
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiTextAreaModule,
    TuiInputFilesModule,
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([USersEffects, FaqEffects, ProductsEffects]),
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
