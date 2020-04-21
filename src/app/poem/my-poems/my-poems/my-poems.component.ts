import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { PoemDataService } from 'src/app/poem-data.service';
import { Observable } from 'rxjs';
import { Poem } from '../../poem.model';
import {
  faTrash,
  faEdit,
  faPenSquare,
  faThumbsUp,
  faThumbsDown,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatList, MatListItem } from '@angular/material';
import { Theme } from '../../poem.theme';
import { AddPoemsDialogComponent } from './add-poems/add-poems-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { style, animate, transition, trigger } from '@angular/animations';

export interface DialogData {
  title: string;
  poemText: string;
  themes: Theme[];
  canceled: boolean;
  toEdit: boolean;
  poem: Poem;
}

@Component({
  selector: 'app-my-poems',
  templateUrl: './my-poems.component.html',
  styleUrls: ['./my-poems.component.css'],
  animations: [
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
export class MyPoemsComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faPenSquare = faPenSquare;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faSyncAlt = faSyncAlt;
  canceled = false;
  title: string;
  poemText: string;
  themes: Theme[];
  toEdit = false;
  selectedPoem;

  username =
    localStorage.getItem('username') == null
      ? sessionStorage.getItem('username')
      : localStorage.getItem('username');
  private _myPoems$: Observable<Poem[]> = this._poemDataService.getMyPoems$(
    this.username
  );
  public loadingError$ = this._poemDataService.loadingError$;

  constructor(
    private _poemDataService: PoemDataService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {}

  get myPoems$() {
    return this._myPoems$;
  }

  refresh(): void {
    this.title = '';
    this.poemText = '';
    this.themes = null;
    this.canceled = false;
    this._myPoems$.subscribe(
      s => (this._myPoems$ = this._poemDataService.getMyPoems$(this.username))
    );
  }

  edit(poem: Poem): void {
    this.selectedPoem = poem;
    this.toEdit = true;
    this.openDialog();
  }

  add(): void {
    this.toEdit = false;
    this.openDialog();
  }

  delete(poem: Poem): void {
    this._poemDataService.deletePoem(poem).subscribe();
    this._toastr.success(`Poem : ${poem.title} Successfully deleted`);
    this.refresh();
  }

  openDialog(): void {
    if (this.toEdit) {
      this.title = this.selectedPoem.title;
      this.poemText = this.selectedPoem.poemText;
      this.themes = this.selectedPoem.themes;
    }
    const dialogRef = this.dialog.open(AddPoemsDialogComponent, {
      width: '500px',
      height: '700px',
      data: {
        title: this.title,
        poemText: this.poemText,
        themes: this.themes,
        canceled: true,
        toEdit: this.toEdit
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!dialogRef.componentInstance.data.canceled) {
        if (this.toEdit) {
          this.selectedPoem.title = dialogRef.componentInstance.data.title;
          this.selectedPoem.poemText =
            dialogRef.componentInstance.data.poemText;
          this.selectedPoem.themes = dialogRef.componentInstance.data.themes;
          this._poemDataService
            .modifyPoem(this.selectedPoem)
            .subscribe(c => this._toastr.success(`Poem successfully edited`));

          this.toEdit = false;
          this.selectedPoem = null;
        } else {
          this.title = dialogRef.componentInstance.data.title;
          this.poemText = dialogRef.componentInstance.data.poemText;
          this.themes = dialogRef.componentInstance.data.themes;
          var poem = new Poem(
            0,
            this.title,
            this.username,
            this.poemText,
            this.themes,
            null,
            null,
            null,
            0,
            0,
            null
          );
          this._poemDataService.addNewPoem(poem).subscribe(c => {
            this._toastr.success(`Poem : ${poem.title} Successfully Created`);
            this.refresh();
          });
        }
      }
    });

    this.title = '';
    this.poemText = '';
    this.themes = null;
    this.canceled = false;
  }
}
