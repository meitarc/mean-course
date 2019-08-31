import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';


@Component({
    selector: 'mapReduceD3',
    templateUrl: './mapReduceD3.component.html',
    styleUrls: ['./mapReduceD3.component.css']
})

export class mapReduceD3Component implements OnInit {

    data = [];
    show = false;

    constructor(private postService: PostsService) {}

    ngOnInit() {
        this.postService.getMapReduceD3().subscribe(d => {
          this.data = d.docs;
          if (this.data.length === 0) {
                this.show = false;
            } else {
                this.show = true;
            }
        });
    }
}
