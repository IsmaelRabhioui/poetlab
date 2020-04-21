import { Pipe, PipeTransform } from '@angular/core';
import { Poem } from './poem.model';

@Pipe({
  name: 'poemFilter'
})
export class PoemFilterPipe implements PipeTransform {
  transform(poems: Poem[], filter: string, selected: string): Poem[] {
    if (!filter || filter.length === 0) {
      return poems;
    }
    switch (selected) {
      case 'title':
        return poems.filter(poem => poem.title.toLowerCase().includes(filter));
        break;
      case 'poemText':
        return poems.filter(poem =>
          poem.poemText.toLowerCase().includes(filter)
        );
        break;
      case 'all':
        return (poems = poems.filter(
          poem =>
            poem.title.toLowerCase().includes(filter) ||
            poem.poemText.toLowerCase().includes(filter)
        ));
        break;
      default:
        return poems;
        break;
    }
  }
}
