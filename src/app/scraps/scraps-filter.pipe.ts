
import {PipeTransform, Pipe, OnInit} from '@angular/core';
import {Scrap} from './scrap.model';

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
        let matches = [];


        posts.forEach(post => {
          let postStr = post.title.toLowerCase() + post.summery.toLowerCase() + post.director;

          let splitedStr = postStr.split(/(?:,| )+/);

          // console.log('splitedstr: ' + splitedStr);

          const ac = new AhoCorasick(splitedStr);
          const result = ac.search(searchTerm);
          // console.log('result of Aho: ' + result.toString());

          if (result.length !== 0) {
            // console.log('possible Match: ' + post.id.toString() + ' of the movie: ' + post.title);
            matches.push(post.id);
          }
        });

        // console.log('matches: ' + matches);

        if (matches.length !== 0) {
          // console.log('Match Found!');
          return posts.filter(post => matches.includes(post.id));
        } else {
          // console.log('Match Not Found!');
          return posts;
         }

      }
}
