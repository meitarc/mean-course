import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';

import { AuthGuard } from './auth/auth.guard';
import { MapComponent } from './map/map-google/map.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },

  { path: 'commentsList', component: CommentListComponent },
  { path: 'comments/create', component: CommentCreateComponent, canActivate: [AuthGuard] },
  { path: 'comments/edit/:commentId', component: CommentCreateComponent, canActivate: [AuthGuard] },

  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
