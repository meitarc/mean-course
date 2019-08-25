import {Post} from './post.model';
import { PipeTransform , Pipe } from '@angular/core';

@Pipe({
    name: 'postImageFilter'
})

export class postImageFilterPipe implements PipeTransform {
    transform(posts: Post[], Image: boolean): Post[] {

      if (!posts || !Image) {
            return posts;
        }
      return null;
    }
}
