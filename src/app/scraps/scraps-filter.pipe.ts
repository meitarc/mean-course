
import { PipeTransform, Pipe, OnInit } from '@angular/core';
import { Scrap } from './scrap.model';
declare var require: any;

@Pipe({
  name: 'ScrapFilter'
})
export class ScrapFilterPipe implements PipeTransform {
  transform(posts: Scrap[], searchTerm: string): Scrap[] {
    const AhoCorasick = require('ahocorasick');
    if (!posts || !searchTerm) {
      return posts;
    }
    searchTerm = searchTerm.toLowerCase();
    const matches = [];
    posts.forEach(post => {
      const postStr = post.title.toLowerCase() + post.summery.toLowerCase() + post.director;
      const splitedStr = postStr.split(/(?:,| )+/);
      const ac = new AhoCorasick(splitedStr);
      const result = ac.search(searchTerm);

      if (result.length !== 0) {
        matches.push(post.id);
      }
    });

    if (matches.length !== 0) {
      return posts.filter(post => matches.includes(post.id));
    } else {
      return posts;
    }

  }
}
