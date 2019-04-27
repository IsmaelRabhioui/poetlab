import { Component, OnInit, Input } from '@angular/core';
import { Poem } from '../poem.model';
s;

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css']
})
export class PoemComponent implements OnInit {
  @Input() public poem: Poem;

  constructor() {}

  ngOnInit() {}
}
