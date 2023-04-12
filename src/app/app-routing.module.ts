import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotosComponent } from './components/upload-photos/upload-photos.component';

const routes: Routes = [
  // { path: '/upload', component: UploadPhotosComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
