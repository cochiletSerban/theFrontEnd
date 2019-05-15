import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { SafeImagePipe } from './pipes/safe-image.pipe';
import { FileSelectDirective } from 'ng2-file-upload/';

import { TestComponent } from './pages/test/test.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeedComponent } from './pages/feed/feed.component';


@NgModule({
  declarations: [
    AppComponent,
    SafeImagePipe,
    FileSelectDirective,
    SignupComponent,
    TestComponent,
    LandingComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
