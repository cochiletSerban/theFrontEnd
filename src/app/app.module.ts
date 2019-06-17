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
import { NgxMasonryModule } from 'ngx-masonry';
import { ImageViewComponent } from './pages/image-view/image-view.component';
import { ImagePanelComponent } from './pages/image-view/image-panel/image-panel.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { CommentComponent } from './pages/image-view/comment/comment.component';
import { ExploreTagsComponent } from './pages/feed/explore-tags/explore-tags.component';
import { FilterPicturesComponent } from './pages/feed/filter-pictures/filter-pictures.component';
import { NavBarComponent } from './pages/shared/nav-bar/nav-bar.component';


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
    ImageViewComponent,
    ImagePanelComponent,
    TimeAgoPipe,
    CommentComponent,
    ExploreTagsComponent,
    FilterPicturesComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxMasonryModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
