import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totoalPosts = 0;
  postsPerPage = 100;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 50, 100];
  userIsAuth = false;
  userId: string;
  curentCreateTimes: number;
  currentDeleteTimes: number;
  private postsSub: Subscription;
  private authStateusSub: Subscription;
  searchTermByTitle: string;
  searchTermByContent: string;
  searchTermByimage = true;


  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totoalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuth = this.authService.getIsAuth();
    this.authStateusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.postsService.getCms().subscribe((d: any) => {
      this.curentCreateTimes = d.doc[0];
      this.currentDeleteTimes = d.doc[1];
    });

  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
    window.location.reload();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStateusSub.unsubscribe();
  }

  getMapR() {
    this.postsService.getMapRed().subscribe((d: any) => {

    });  }
}
