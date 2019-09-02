import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Post } from './post.model';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }
  getAllPosts() {
    return this.posts;
  }
  getPosts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>(
      BACKEND_URL + queryParams
    )
      .pipe(map((postDate) => {
        return {
          posts: postDate.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator,
              userName: post.userName,
              postDate: post.postDate,
              latitude: post.latitude,
              longitude: post.longitude
            };
          }),
          maxPosts: postDate.maxPosts
        };
      }))
      .subscribe(transformPosts => {
        this.posts = transformPosts.posts;
        this.postsUpdated.next({ posts: [...this.posts], postCount: transformPosts.maxPosts });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string, latitude: string, longitude: string }>(
      BACKEND_URL + id
    );
  }

  addPost(title: string, content: string, image: File, addImage: boolean, latitude: string, longitude: string) {
    const postDate = new FormData();
    postDate.append('title', title);
    postDate.append('content', content);
    if (addImage) {
      postDate.append('image', image, title);
    } else {
      postDate.append('image', null);
    }
    postDate.append('latitude', latitude);
    postDate.append('longitude', longitude);

    this.http
      .post<{ message: string, post: Post }>(
        BACKEND_URL,
        postDate
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string, addImage: boolean, latitude: string, longitude: string) {
    let postDate: Post | FormData;
    if (typeof (image) === 'object') {
      postDate = new FormData();
      postDate.append('id', id);
      postDate.append('title', title);
      postDate.append('content', content);

      if (addImage) {
        postDate.append('image', image, title);
      } else {
        postDate.append('image', null);
      }
      postDate.append('latitude', latitude);
      postDate.append('latitude', longitude);
    } else {

      if (addImage) {
        postDate = { id, title, content, imagePath: image, creator: null, userName: null, postDate: null, latitude, longitude };

      } else {
        postDate = { id, title, content, imagePath: null, creator: null, userName: null, postDate: null, latitude, longitude };

      }

      postDate = { id, title, content, imagePath: image, creator: null, userName: null, postDate: null, latitude, longitude };
    }

    this.http
      .put(BACKEND_URL + id, postDate)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  getTitlesD3() {
    return this.http.get<{ docs: any[] }>(BACKEND_URL + 'd3title');
  }
  getMapReduceD3() {
    return this.http.get<{ docs: any[] }>(BACKEND_URL + 'd3Reduce');
  }

  newGetAll() {
    return this.http.get<{ docs: any[] }>(BACKEND_URL + 'maps');
  }

  getCms() {
    return this.http.get<{ docs: any[] }>(BACKEND_URL + 'sketch');
  }

}
