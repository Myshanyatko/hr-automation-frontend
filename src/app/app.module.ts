import { EventsEffects } from './store/effects/events.effects';
import { GoogleMapsModule } from '@angular/google-maps';

import { RestaurantsEffects } from './store/effects/restaurants.effects';
import { apiKey } from './../../apiKey';

import { AuthEffects } from './store/effects/auth.effects';
import { ProductsEffects } from './store/effects/products.effects';
import { FaqEffects } from './store/effects/faq.effects';
import { environment } from './../environments/environment';
import { appReducers } from './store/reducers/app.reducers';
import { USersEffects } from './store/effects/users.effects';
import {
  TuiRootModule,
  TuiLabelModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiDropdownModule,
  TuiLinkModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
  TuiLoaderModule,
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
  TuiInputNumberModule,
  TuiMultiSelectModule,
  TuiPaginationModule,
  TuiFilterModule,
  TuiTabsModule,
  TuiRatingModule,
  TuiInputDateTimeModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule,
  TuiIslandModule,
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
import { RestoransComponent } from './restorans/restorans.component';
import { CreateRestaurantComponent } from './restorans/create-restaurant/create-restaurant.component';
import { NewCityComponent } from './restorans/new-city/new-city.component';
import { RestaurantComponent } from './restorans/restaurant/restaurant.component';
import { EditRestaurantComponent } from './restorans/edit-restaurant/edit-restaurant.component';
import { EventsComponent } from './events/events/events.component';
import { EventComponent } from './events/event/event.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';

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
    RestoransComponent,
    CreateRestaurantComponent,
    NewCityComponent,
    RestaurantComponent,
    EditRestaurantComponent,
    EventsComponent,
    EventComponent,
    CreateEventComponent,
    EditEventComponent
  ],
  imports: [
    GoogleMapsModule,
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
    TuiPaginationModule,
    TuiInputNumberModule,
    TuiLoaderModule,
    TuiMultiSelectModule,
    TuiFilterModule,
    TuiTabsModule,
    TuiLinkModule,
    TuiRatingModule,
    TuiInputDateTimeModule,
    TuiRadioLabeledModule,
    TuiIslandModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      USersEffects,
      FaqEffects,
      ProductsEffects,
      AuthEffects,
      RestaurantsEffects,
      EventsEffects,
    ]),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
