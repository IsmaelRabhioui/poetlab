import { Pipe, PipeTransform } from '@angular/core';
import { Poem } from './poem.model';

@Pipe({
  name: 'poemSort'
})
export class PoemSortPipe implements PipeTransform {
  transform(poems: Poem[], sortType: string, sortBy: string): Poem[] {
    if (sortType == 'none') {
      return poems;
    }

    if (sortBy == 'title') {
      return poems.sort((poem1, poem2) => {
        var p1 = poem1.title.toLowerCase();
        var p2 = poem2.title.toLowerCase();
        if (p1 > p2) {
          return sortType == 'up' ? 1 : -1;
        } else if (p1 < p2) {
          return sortType == 'up' ? -1 : 1;
        }
        return 0;
      });
    } else {
      return poems.sort((poem1, poem2) => {
        return sortType == 'up'
          ? new Date(poem2.date).getTime() - new Date(poem1.date).getTime()
          : new Date(poem1.date).getTime() - new Date(poem2.date).getTime();
      });
    }
  }
}
