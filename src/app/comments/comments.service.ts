import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Comment } from './comment.model';

const BACKEND_URL = environment.apiUrl + '/comments/';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private comments: Comment[] = [];
  private commentsUpdated = new Subject<{ comments: Comment[], commentCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getComments(commentsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${commentsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, comments: any, maxComments: number }>(
      BACKEND_URL + queryParams
    )
      .pipe(map((commentDate) => {
        return {
          comments: commentDate.comments.map(comment => {
            return {
              title: comment.title,
              content: comment.content,
              id: comment._id,
              creator: comment.creator,
              userName: comment.userName,
              commentDate: comment.commentDate,
            };
          }),
          maxComments: commentDate.maxComments
        };
      }))
      .subscribe(transformComments => {
        console.log(transformComments);
        this.comments = transformComments.comments;
        this.commentsUpdated.next({ comments: [...this.comments], commentCount: transformComments.maxComments });
      });
  }

  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  getComment(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, creator: string, postId: string}>(
      BACKEND_URL + id
    );
  }

  addComment(postId: string, title: string, content: string) {
    const commentDate = new FormData();
    commentDate.append('postId', postId);
    commentDate.append('title', title);
    commentDate.append('content', content);
    console.log(title);

    this.http
      .post<{ message: string, comment: Comment }>(
        BACKEND_URL,
        commentDate
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updateComment(id: string, title: string, content: string, postId: string) {
    console.log('updateee');
    let commentDate: Comment | FormData;
    commentDate = new FormData();

    commentDate = { id, title, content, creator: null, postId: null};
    console.log(commentDate);

    this.http
      .put(BACKEND_URL +  id, commentDate)
      .subscribe(response => {
        this.router.navigate(['/']);
      });

  }

  deleteComment(commentId: string) {
    return this.http.delete(BACKEND_URL +  commentId);
  }
}
