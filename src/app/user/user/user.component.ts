import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.css'],
  templateUrl: './user.component.html',
  styles: [],
  animations: [
    trigger('itemEnter', [
      transition('void => *', [
        style({ transform: 'translateY(-70%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
