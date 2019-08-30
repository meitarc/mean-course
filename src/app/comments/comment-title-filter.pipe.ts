import {Comment} from './comment.model';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'commentTitleFilter'
})

export class CommentTitleFilterPipe implements PipeTransform {
    transform(comments: Comment[], searchTerm: string): Comment[] {
        if (!comments || !searchTerm) {
            return comments;
        }
        return comments.filter(comment =>
            comment.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
    }
}
