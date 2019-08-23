import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from '../comment.model';
import { CommentsService } from '../comments.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})

export class CommentListComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  isLoading = false;
  totoalComments = 0;
  commentsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuth = false;
  userId: string;
  zivStirng: string;
  private commentsSub: Subscription;
  private authStateusSub: Subscription;

  constructor(public commentsService: CommentsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.commentsService.getComments(this.commentsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.commentsSub = this.commentsService.getCommentUpdateListener()
      .subscribe((commentData: { comments: Comment[], commentCount: number }) => {
        this.isLoading = false;
        this.totoalComments = commentData.commentCount;
        this.comments = commentData.comments;
      });
    this.userIsAuth = this.authService.getIsAuth();
    this.authStateusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.commentsPerPage = pageData.pageSize;
    this.commentsService.getComments(this.commentsPerPage, this.currentPage);
  }

  onDelete(commentId: string) {
    this.isLoading = true;
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.commentsService.getComments(this.commentsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
    this.authStateusSub.unsubscribe();
  }
}
