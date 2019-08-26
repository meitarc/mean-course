import {Post} from './post.model';
import { PipeTransform , Pipe } from '@angular/core';

@Pipe({
    name: 'postImageFilter'
})

export class postImageFilterPipe implements PipeTransform {
    postsToReturn: Post[] = [];

    transform(posts: Post[], Image: boolean): Post[] {
      this.postsToReturn = [];

      for (const post of posts) {
        if (post.imagePath != null) {
          console.log('post to return ' + this.postsToReturn);
          console.log(post);

          this.postsToReturn.push(post);
        }
      }
      if (!posts || !Image) {
            return this.postsToReturn;
      }
      return posts;
    }
}
