import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../my-poems.component';
import { Theme } from 'src/app/poem/poem.theme';
import { FormControl, Validators } from '@angular/forms';
import { transition, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-add-poems-dialog',
  templateUrl: './add-poems-dialog.component.html',
  styleUrls: ['./add-poems-dialog.component.css']
})
export class AddPoemsDialogComponent implements OnInit {
  themeControl = new FormControl('', [Validators.required]);
  poemTextControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);
  selected: Theme[];

  ngOnInit(): void {}
  keys(): Array<string> {
    var keys = Object.keys(Theme);
    return keys.slice(keys.length / 2);
  }
  constructor(
    public dialogRef: MatDialogRef<AddPoemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onYesClick(): void {
    this.data.canceled = false;
  }

  onNoClick(): void {
    this.data.canceled = true;
    this.dialogRef.close();
  }
}
