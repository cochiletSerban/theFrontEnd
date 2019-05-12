import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { SafeImagePipe } from './pipes/safe-image.pipe';
import { FileSelectDirective } from 'ng2-file-upload/';

import { TestComponent } from './pages/test/test.component';
import { SignupComponent } from './pages/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    SafeImagePipe,
    FileSelectDirective,
    SignupComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
