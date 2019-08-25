import{Comment}from './comment.model';
import {PipeTransform,Pipe} from '@angular/core';

@Pipe({
    name:'commentContentFilter'
})

export class CommentContentFilterPipe implements PipeTransform{
    transform(comments:Comment[],searchTerm:String):Comment[] {
        if(!comments || !searchTerm)
        {
            return comments;
        }
        return comments.filter(comment=>
            comment.content.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())!== -1);
    }
}