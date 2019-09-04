import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapReduceD3',
  templateUrl: './mapReduceD3.component.html',
  styleUrls: ['./mapReduceD3.component.css']
})

// tslint:disable-next-line: class-name
export class mapReduceD3Component implements OnInit {

  data = [];
  show = false;

  constructor(private postService: PostsService) { }

  ngOnInit() { // get the data to the d3 graph
    this.postService.getMapReduceD3().subscribe((d: any) => {
      this.data = d.docs.results;
      if (this.data.length === 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    });
  }
}
