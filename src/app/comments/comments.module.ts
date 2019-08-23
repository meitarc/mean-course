import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CommentCreateComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})

export class CommentsModule {}
