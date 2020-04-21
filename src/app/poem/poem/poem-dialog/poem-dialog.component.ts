import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ComponentFactoryResolver
} from '@angular/core';
import { DialogData } from '../../my-poems/my-poems/my-poems.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  faTimes,
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { PoemDataService } from 'src/app/poem-data.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-poem-dialog',
  templateUrl: './poem-dialog.component.html',
  styleUrls: ['./poem-dialog.component.css']
})
export class PoemDialogComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  isDownvoter = false;
  isUpvoter = false;
  isNone = true;
  action = '';
  currentUser =
    sessionStorage.getItem('username') == null
      ? localStorage.getItem('username')
      : sessionStorage.getItem('username');
  constructor(
    public dialogRef: MatDialogRef<PoemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _poemDataService: PoemDataService
  ) {}

  upVote() {
    this.data.poem.addUpvote();
    this.data.poem.addUpvoter(this.currentUser);
    this.isUpvoter = true;
    this.action = '+1';
    if (this.isDownvoter) {
      this.data.poem.removeDownvote();
      this.data.poem.removeDownvoter(this.currentUser);
      this.isDownvoter = false;
    }

    this.isNone = false;
  }
  downVote() {
    this.data.poem.addDownvote();
    this.data.poem.addDownvoter(this.currentUser);
    this.isDownvoter = true;
    this.action = '+0';
    if (this.isUpvoter) {
      this.data.poem.removeUpvote();
      this.data.poem.removeUpvoter(this.currentUser);
      this.isUpvoter = false;
    }

    this.isNone = false;
  }
  none() {
    if (this.isDownvoter) {
      this.action = '-0';
      this.data.poem.removeDownvote();
      this.data.poem.removeDownvoter(this.currentUser);
      this.isDownvoter = false;
    } else if (this.isUpvoter) {
      this.action = '-1';
      this.data.poem.removeUpvote();
      this.data.poem.removeUpvoter(this.currentUser);
      this.isUpvoter = false;
    }
    this.isNone = true;
  }

  ngOnInit() {
    if (this.data.poem.upVoters.includes(this.currentUser)) {
      this.isUpvoter = true;
      this.isNone = false;
    } else if (this.data.poem.downVoters.includes(this.currentUser)) {
      this.isDownvoter = true;
      this.isNone = false;
    }
  }

  ngOnDestroy(): void {
    if (this.action.includes('+')) {
      this._poemDataService
        .addVote(this.data.poem.id, this.currentUser, +this.action.charAt(1))
        .subscribe();
    } else if (this.action.includes('-')) {
      this._poemDataService
        .deleteVote(this.data.poem.id, this.currentUser, +this.action.charAt(1))
        .subscribe();
    }
  }
}
