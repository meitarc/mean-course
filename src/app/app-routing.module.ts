import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';

import { AuthGuard } from './auth/auth.guard';
import { MapComponent } from './map/map-google/map.component';
import { Postd3Component } from './postd3/postd3.component';
import { ScrapListComponent } from './scraps/scrap-list/scrap-list.component';

import { ChatComponent } from './web-socket/socket-io/chat.component';
import { mapReduceD3Component } from './mapReduceD3/mapReduceD3.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },

  { path: 'comments/list/:postid', component: CommentListComponent },
  { path: 'comments/create/:postid', component: CommentCreateComponent, canActivate: [AuthGuard] },
  { path: 'comments/edit/:commentId', component: CommentCreateComponent, canActivate: [AuthGuard] },

  { path: 'scraps', component: ScrapListComponent },

  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'map', component: MapComponent },
  { path: 'd3', component: Postd3Component },
  { path: 'mapReduceD3', component: mapReduceD3Component },

  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
