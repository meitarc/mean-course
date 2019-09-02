import { Post } from './post.model';
import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'postContentFilter'
})

export class PostContentFilterPipe implements PipeTransform {
  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }
    return posts.filter(post =>
      post.content.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
  }
}
