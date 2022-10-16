import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KeyComponent } from './key/key.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MainComponent } from './main/main.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KeyComponent,
    MainComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
