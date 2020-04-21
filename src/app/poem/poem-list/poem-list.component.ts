import { Component, OnInit, Input } from '@angular/core';
import { PoemDataService } from '../../poem-data.service';
import { Observable, Subject } from 'rxjs';
import { Poem } from '../poem.model';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import {
  faSearch,
  faSortUp,
  faSortDown,
  faGripLines,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../poem.theme';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-poem-list',
  templateUrl: './poem-list.component.html',
  styleUrls: ['./poem-list.component.css'],
  animations: [
    trigger('itemLeave', [
      transition('* => void', [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate(
          '0.2s ease-in-out',
          style({ transform: 'translateY(-3%)', opacity: 0 })
        ),
        style({ position: 'fixed' })
      ])
    ]),
    trigger('itemEnter', [
      transition('void => *', [
        style({ transform: 'translateY(10%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class PoemListComponent implements OnInit {
  faSearch = faSearch;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faCurrentSortTitle = faGripLines;
  faCurrentSortDate = faGripLines;
  sortType = 'none';
  sortBy = 'none';
  selected;
  selectedThemes;

  public filterPoemName: string;
  public filterPoem$ = new Subject<string>();
  private _poems$: Observable<Poem[]> = this._poemDataService.poems$;
  public loadingError$ = this._poemDataService.loadingError$;

  sort(type: string) {
    this.sortType = type == this.sortBy ? this.sortType : 'none';
    this.sortBy = type;
    this.sortType =
      this.sortType == 'none' ? 'up' : this.sortType == 'up' ? 'down' : 'none';
    if (type == 'title') {
      this.faCurrentSortDate = faGripLines;
      this.faCurrentSortTitle =
        this.sortType == 'up'
          ? faSortUp
          : this.sortType == 'down'
          ? faSortDown
          : faGripLines;
    } else {
      this.faCurrentSortTitle = faGripLines;
      this.faCurrentSortDate =
        this.sortType == 'up'
          ? faSortUp
          : this.sortType == 'down'
          ? faSortDown
          : faGripLines;
    }
  }

  keys(): Array<string> {
    var keys = Object.keys(Theme);
    return keys.slice(keys.length / 2);
  }

  constructor(private _poemDataService: PoemDataService) {
    this.filterPoem$
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(val => val.toLowerCase())
      )
      .subscribe(val => {
        console.log(this.sortBy);
        this.filterPoemName = val;
      });
  }

  ngOnInit() {}

  get poems$() {
    return this._poems$;
  }
}
