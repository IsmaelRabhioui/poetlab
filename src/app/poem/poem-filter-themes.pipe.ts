import { Pipe, PipeTransform } from '@angular/core';
import { Poem } from './poem.model';

@Pipe({
  name: 'poemFilterThemes'
})
export class PoemFilterThemesPipe implements PipeTransform {
  transform(poems: Poem[], selectedThemes: string[]): Poem[] {
    if (!selectedThemes || selectedThemes.length == 0) {
      return poems;
    }
    return poems.filter(poem =>
      poem.themes.some(t => selectedThemes.includes(t.toString()))
    );
  }
}
