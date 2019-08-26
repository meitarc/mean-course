import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';


@Component({
    selector: 'postd3',
    templateUrl: './postd3.component.html',
    styleUrls: ['./postd3.component.css']
})

export class Postd3Component implements OnInit {

    //data:Post[] = [];
    data = []
    show = false;
    
    constructor(private postService: PostsService) {
     }

    ngOnInit() {               
        //this.data=this.postService.getAllPosts();
        console.log('this.data!!!!!!!');

        console.log(this.data);
        this.postService.getTitlesD3().subscribe(d => {
            this.data = d.docs;
            if (this.data.length == 0) {
                this.show = false;
            }
            else {
                this.show = true;
            }
        });
       
    }
}