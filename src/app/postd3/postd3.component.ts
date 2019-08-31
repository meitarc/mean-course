import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'postd3',
    templateUrl: './postd3.component.html',
    styleUrls: ['./postd3.component.css']
})

export class Postd3Component implements OnInit {

    data = [];
    show = false;

    constructor(private postService: PostsService) {}

    ngOnInit() {
        this.postService.getTitlesD3().subscribe(d => {
          this.data = d.docs;
          if (this.data.length === 0) {
                this.show = false;
            } else {
                this.show = true;
            }
        });
    }
}
