import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from '../comment.model';
import { CommentsService } from '../comments.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})

export class CommentListComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  commentsOfPost: Comment[] = [];

  isLoading = false;
  totoalComments = 0;
  commentsPerPage = 500;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuth = false;
  userId: string;
  private commentsSub: Subscription;
  private authStateusSub: Subscription;
  postId: string;
  searchTermByTitle: string;
  searchTermByContent: string;

  firstTime = true;
  constructor(public commentsService: CommentsService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.commentsService.getComments(this.commentsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.commentsSub = this.commentsService.getCommentUpdateListener()
      .subscribe((commentData: { comments: Comment[], commentCount: number }) => {
        this.isLoading = false;
        this.totoalComments = commentData.commentCount;
        this.comments = commentData.comments;
        this.loadComments();
      });
    this.userIsAuth = this.authService.getIsAuth();
    this.authStateusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.postId = paramMap.get('postid');
    });
  }

  loadComments() {
    let bool = false;
    this.commentsService.getComments(this.commentsPerPage, this.currentPage);
    for ( const c of this.comments ) {
      if ( c.postId === this.postId ) {
        for (const c2 of this.commentsOfPost) {
          if (c2.id === c.id) {
            bool = true;
          }
        }
        if (!bool) {
          this.commentsOfPost.push(c);
        }
        bool = false;
      }
    }
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

    this.commentsOfPost = [];
    this.loadComments();
    window.location.reload();

  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
    this.authStateusSub.unsubscribe();
    this.commentsOfPost = [];

  }
}
