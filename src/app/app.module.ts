import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { SafeImagePipe } from './pipes/safe-image.pipe';
import { FileSelectDirective } from 'ng2-file-upload/';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TestComponent } from './pages/test/test.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ImageCardComponent } from './pages/feed/image-card/image-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SafeImagePipe,
    FileSelectDirective,
    SignupComponent,
    TestComponent,
    LandingComponent,
    FeedComponent,
    ImageCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
