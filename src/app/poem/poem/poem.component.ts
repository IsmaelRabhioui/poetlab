import { Component, OnInit, Input } from '@angular/core';
import { Poem } from '../poem.model';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { PoemDialogComponent } from './poem-dialog/poem-dialog.component';
@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css']
})
export class PoemComponent implements OnInit {
  @Input() public poem: Poem;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PoemDialogComponent, {
      data: {
        poem: this.poem
      }
    });
  }

  ngOnInit() {}
}
