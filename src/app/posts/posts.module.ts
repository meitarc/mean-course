import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostTitleFilterPipe } from './posts-title-filter.pipe';
import { PostContentFilterPipe } from './post-content-filter.pipe';
import { postImageFilterPipe } from './post-Image-filter.pipe';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostTitleFilterPipe,
    PostContentFilterPipe,
    postImageFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})

export class PostsModule {}
