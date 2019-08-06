import { EditInfoComponent } from './pages/picture-upload/edit-info/edit-info.component';
import { ImageViewComponent } from './pages/image-view/image-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { TestComponent } from './pages/test/test.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { FeedComponent } from './pages/feed/feed.component';
import { LocationFeedComponent } from './pages/location-feed/location-feed.component';
import { PictureUploadComponent } from './pages/picture-upload/picture-upload.component';


const routes: Routes = [
  {path: 'test', canActivate: [AuthGuard], component: TestComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: LandingComponent},
  {path: 'explore', component: FeedComponent},
  {path: 'explore/:tag', component: FeedComponent},
  {path: 'image/:imageId', component: ImageViewComponent},
  {path: 'feed', component: LocationFeedComponent},
  {path: 'upload', component: PictureUploadComponent},
  {path: 'upload/edit-info', component: EditInfoComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
