import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommentContentFilterPipe } from './comment-content-filter.pipe';
import { CommentTitleFilterPipe } from './comment-title-filter.pipe';


@NgModule({
  declarations: [
    CommentCreateComponent,
    CommentListComponent,
    CommentContentFilterPipe,
    CommentTitleFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})

export class CommentsModule {}
